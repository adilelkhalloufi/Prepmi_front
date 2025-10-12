import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WeeklyMenu } from '@/types/weeklyMenu';
import { WeeklyMenuService } from '@/services/weeklyMenuService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const WeeklyMenuManager: React.FC = () => {
    const [weeklyMenus, setWeeklyMenus] = useState<WeeklyMenu[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'active' | 'published' | 'current'>('all');

    useEffect(() => {
        loadWeeklyMenus();
    }, [filter]);

    const loadWeeklyMenus = async () => {
        try {
            setLoading(true);
            const params = {
                ...(filter === 'active' && { is_active: true }),
                ...(filter === 'published' && { is_published: true }),
                ...(filter === 'current' && { current_week: true }),
            };
            const response = await WeeklyMenuService.getWeeklyMenus(params);
            setWeeklyMenus(response.data);
        } catch (error) {
            console.error('Failed to load weekly menus:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePublishToggle = async (menu: WeeklyMenu) => {
        try {
            if (menu.is_published) {
                await WeeklyMenuService.unpublishWeeklyMenu(menu.id);
            } else {
                await WeeklyMenuService.publishWeeklyMenu(menu.id);
            }
            loadWeeklyMenus();
        } catch (error) {
            console.error('Failed to toggle publish status:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this weekly menu?')) {
            try {
                await WeeklyMenuService.deleteWeeklyMenu(id);
                loadWeeklyMenus();
            } catch (error) {
                console.error('Failed to delete weekly menu:', error);
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center p-8">Loading...</div>;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Weekly Menus</h1>
                <Link to="/dashboard/weekly-menus/create">
                    <Button>Create New Menu</Button>
                </Link>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-2 mb-6">
                {['all', 'active', 'published', 'current'].map((filterOption) => (
                    <Button
                        key={filterOption}
                        variant={filter === filterOption ? 'default' : 'outline'}
                        onClick={() => setFilter(filterOption as any)}
                        className="capitalize"
                    >
                        {filterOption}
                    </Button>
                ))}
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {weeklyMenus.map((menu) => (
                    <Card key={menu.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{menu.title}</CardTitle>
                                <div className="flex gap-2">
                                    {menu.is_active && <Badge variant="success">Active</Badge>}
                                    {menu.is_published && <Badge variant="default">Published</Badge>}
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">
                                {format(new Date(menu.week_start_date), 'MMM d')} - {format(new Date(menu.week_end_date), 'MMM d, yyyy')}
                            </p>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-700 mb-4">{menu.description}</p>
                            <div className="text-sm text-gray-500 mb-4">
                                {menu.meals?.length || 0} meals
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <Link to={`/dashboard/weekly-menus/${menu.id}`}>
                                    <Button size="sm" variant="outline">View</Button>
                                </Link>
                                <Link to={`/dashboard/weekly-menus/${menu.id}/edit`}>
                                    <Button size="sm" variant="outline">Edit</Button>
                                </Link>
                                <Button
                                    size="sm"
                                    variant={menu.is_published ? "destructive" : "default"}
                                    onClick={() => handlePublishToggle(menu)}
                                >
                                    {menu.is_published ? 'Unpublish' : 'Publish'}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDelete(menu.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {weeklyMenus.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No weekly menus found</p>
                    <Link to="/dashboard/weekly-menus/create">
                        <Button>Create Your First Menu</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default WeeklyMenuManager;
