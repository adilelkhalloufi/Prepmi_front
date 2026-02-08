import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MealsHeaderProps {
    weeklyMenu: any;
}

export function MealsHeader({ weeklyMenu }: MealsHeaderProps) {
    const { t } = useTranslation();

    return (
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
                {weeklyMenu?.title || t("joinNow.meals.title")}
            </h2>
            <p className="text-muted-foreground">
                {weeklyMenu?.description ||
                    t(
                        "joinNow.meals.subtitle"
                    )}
            </p>
            {weeklyMenu && (
                <div className="mt-3">
                    <Badge variant="outline" className="text-sm px-4 py-1">
                        <Calendar className="w-4 h-4 mr-2 inline" />
                        {new Date(weeklyMenu.week_start_date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                        })}{" "}
                        -{" "}
                        {new Date(weeklyMenu.week_end_date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </Badge>
                </div>
            )}
        </div>
    );
}
