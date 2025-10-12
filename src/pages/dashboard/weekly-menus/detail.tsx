import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { WeeklyMenu, MenuMeal, Meal } from '@/types/weeklyMenu';
import { WeeklyMenuService } from '@/services/weeklyMenuService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import { Plus, Edit, Trash2, Star, DollarSign } from 'lucide-react';

const WeeklyMenuDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [menu, setMenu] = useState<WeeklyMenu | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadMenu();
        }
    }, [id]);

    const loadMenu = async () => {
        try {
            setLoading(true);
            const menuData = await WeeklyMenuService.getWeeklyMenu(Number(id));
            setMenu(menuData);
        } catch (error) {
            console.error('Failed to load menu:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePublishToggle = async () => {
        if (!menu) return;

        try {
            if (menu.is_published) {
                await WeeklyMenuService.unpublishWeeklyMenu(menu.id);
            } else {
                await WeeklyMenuService.publishWeeklyMenu(menu.id);
            }
            loadMenu();
        } catch (error) {
            console.error('Failed to toggle publish status:', error);
        }
    };

    const handleRemoveMeal = async (menuMealId: number) => {
        if (window.confirm('Are you sure you want to remove this meal from the menu?')) {
            try {
                await WeeklyMenuService.removeMealFromMenu(menuMealId);
                loadMenu();
            } catch (error) {
                console.error('Failed to remove meal:', error);
            }
        }
    };

    const calculateAvailabilityPercentage = (menuMeal: MenuMeal) => {
        if (menuMeal.availability_count === 0) return 0;
        return ((menuMeal.availability_count - menuMeal.sold_count) / menuMeal.availability_count) * 100;
    };

    const getEffectivePrice = (menuMeal: MenuMeal) => {
        return menuMeal.special_price || menuMeal.meal.price;
    };

    if (loading) {
        return <div className="flex justify-center p-8">Loading menu...</div>;
    }

    if (!menu) {
        return <div className="flex justify-center p-8">Menu not found</div>;
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-3xl font-bold">{menu.title}</h1>
                    <p className="text-gray-600 mt-2">
                        {format(new Date(menu.week_start_date), 'MMMM d')} - {format(new Date(menu.week_end_date), 'MMMM d, yyyy')}
                    </p>
                    <p className="text-gray-700 mt-2">{menu.description}</p>
                </div>
                <div className="flex gap-2">
                    {menu.is_active && <Badge variant="success">Active</Badge>}
                    {menu.is_published && <Badge variant="default">Published</Badge>}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
                <Link to={`/dashboard/weekly-menus/${menu.id}/edit`}>
                    <Button variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Menu
                    </Button>
                </Link>
                <Button
                    variant={menu.is_published ? "destructive" : "default"}
                    onClick={handlePublishToggle}
                >
                    {menu.is_published ? 'Unpublish' : 'Publish'}
                </Button>
                <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Meals
                </Button>
            </div>

            {/* Menu Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold">{menu.meals?.length || 0}</div>
                        <div className="text-sm text-gray-600">Total Meals</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                            {menu.meals?.filter(m => m.is_featured).length || 0}
                        </div>
                        <div className="text-sm text-gray-600">Featured Meals</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                            {menu.meals?.reduce((sum, m) => sum + m.sold_count, 0) || 0}
                        </div>
                        <div className="text-sm text-gray-600">Total Sold</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                            ${menu.meals?.reduce((sum, m) => sum + (getEffectivePrice(m) * m.sold_count), 0).toFixed(2) || '0.00'}
                        </div>
                        <div className="text-sm text-gray-600">Revenue</div>
                    </CardContent>
                </Card>
            </div>

            {/* Meals List */}
            <Card>
                <CardHeader>
                    <CardTitle>Menu Meals</CardTitle>
                </CardHeader>
                <CardContent>
                    {menu.meals && menu.meals.length > 0 ? (
                        <div className="space-y-4">
                            {menu.meals
                                .sort((a, b) => a.position - b.position)
                                .map((menuMeal) => (
                                    <div
                                        key={menuMeal.id}
                                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Meal Image */}
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0">
                                                {menuMeal.meal.image_url ? (
                                                    <img
                                                        src={menuMeal.meal.image_url}
                                                        alt={menuMeal.meal.name}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>

                                            {/* Meal Details */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-semibold">{menuMeal.meal.name}</h3>
                                                    {menuMeal.is_featured && (
                                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">{menuMeal.meal.description}</p>

                                                {/* Price Info */}
                                                <div className="flex items-center gap-4 text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <DollarSign className="w-4 h-4" />
                                                        <span className="font-medium">${getEffectivePrice(menuMeal).toFixed(2)}</span>
                                                        {menuMeal.special_price && (
                                                            <span className="text-gray-500 line-through ml-2">
                                                                ${menuMeal.meal.price.toFixed(2)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <Badge variant="outline">{menuMeal.meal.category}</Badge>
                                                </div>
                                            </div>

                                            {/* Availability Progress */}
                                            <div className="w-32">
                                                <div className="text-sm text-gray-600 mb-1">
                                                    Available: {menuMeal.availability_count - menuMeal.sold_count}/{menuMeal.availability_count}
                                                </div>
                                                <Progress
                                                    value={calculateAvailabilityPercentage(menuMeal)}
                                                    className="h-2"
                                                />
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Sold: {menuMeal.sold_count}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleRemoveMeal(menuMeal.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500 mb-4">No meals added to this menu yet</p>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Your First Meal
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default WeeklyMenuDetail;
