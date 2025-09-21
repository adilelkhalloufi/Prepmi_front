import { Badge } from "../ui/badge";
import { Categorie } from "@/interfaces/admin";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import i18next from "i18next";
import { CategoryTypesEnum } from "@/enum/CategoryTypes";
import { useTranslation } from "react-i18next";
import { toggleInterests } from "@/store/slices/registerSlice";

const InterseingForm = ({ form, data }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const selectedCategories = useSelector((state: RootState) => state.register.interests);

    const handleToggle = (id: string) => {
        dispatch(toggleInterests(id));
    };
    const DataScarp = data.filter((category: Categorie) => category.family_id === CategoryTypesEnum.Scrap);
    const DataStagnant = data.filter((category: Categorie) => category.family_id === CategoryTypesEnum.Stagnant);


    return (
        <>
            <h1 className="text-4xl font-semibold text-center  my-4">{t('menu_scrap')}</h1>
            <div className="flex flex-wrap gap-2  ">

                {DataScarp.map((category: Categorie) => (
                    <Badge
                        key={category.id}
                        className={`cursor-pointer p-2 text-sm rounded-lg transition-all ${selectedCategories.includes(category.id) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={() => handleToggle(category.id)}
                    >
                        {category.name[i18next.language]}
                    </Badge>
                ))}
            </div>

            {/* <h1 className="text-4xl font-semibold text-center  my-4">{t('menu_stagnant')}</h1> */}
            <div className="flex flex-wrap gap-2  ">

                {
                    DataStagnant.map((category: Categorie) => (
                        <Badge
                            key={category.id}
                            className={`cursor-pointer p-2 text-sm rounded-lg transition-all ${selectedCategories.includes(category.id) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                            onClick={() => handleToggle(category.id)}
                        >
                            {category.name[i18next.language]}
                        </Badge>
                    ))
                }
            </div >
        </>


    );
}

export default InterseingForm;