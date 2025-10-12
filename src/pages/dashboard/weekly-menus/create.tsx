import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WeeklyMenuFormData } from '@/types/weeklyMenu';
import { WeeklyMenuService } from '@/services/weeklyMenuService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const WeeklyMenuCreate: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<WeeklyMenuFormData>({
        week_start_date: '',
        week_end_date: '',
        title: '',
        description: '',
        is_active: true,
        is_published: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const newMenu = await WeeklyMenuService.createWeeklyMenu(formData);
            navigate(`/dashboard/weekly-menus/${newMenu.id}`);
        } catch (error) {
            console.error('Failed to create weekly menu:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof WeeklyMenuFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Create Weekly Menu</h1>
                <p className="text-gray-600">Set up a new weekly menu for your restaurant</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Menu Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="week_start_date">Week Start Date</Label>
                                <Input
                                    id="week_start_date"
                                    type="date"
                                    value={formData.week_start_date}
                                    onChange={(e) => handleInputChange('week_start_date', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="week_end_date">Week End Date</Label>
                                <Input
                                    id="week_end_date"
                                    type="date"
                                    value={formData.week_end_date}
                                    onChange={(e) => handleInputChange('week_end_date', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="title">Menu Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder="e.g., Autumn Flavors Menu"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="Describe this week's special menu..."
                                rows={4}
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is_active"
                                    checked={formData.is_active}
                                    onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is_published"
                                    checked={formData.is_published}
                                    onCheckedChange={(checked) => handleInputChange('is_published', checked)}
                                />
                                <Label htmlFor="is_published">Published</Label>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Menu'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/dashboard/weekly-menus')}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default WeeklyMenuCreate;
