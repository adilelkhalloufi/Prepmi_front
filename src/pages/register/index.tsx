import { Button } from "@/components/ui/button";
import { defineStepper } from "@stepperize/react";
import { useTranslation } from "react-i18next";
import TypeAccount from "@/components/register/TypeAccount";
import InterseingForm from "@/components/register/InterseingForm";
import PersonalInformation from "@/components/register/PersonalInformation";
import { useEffect, useState } from "react";
import { Categorie, RegisterForm, Specialitie } from "@/interfaces/admin";
import { apiRoutes } from "@/routes/api";
import { defaultHttp } from "@/utils/http";
import { handleErrorResponse } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { restRegister } from "@/store/slices/registerSlice";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "@/routes/web";




const Register = () => {

    const { t } = useTranslation();
    const form = useSelector((state: RootState) => state.register)
     const [Stepper, setStepper] = useState(1);
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

 

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [Stepper]);
    const stepComponents = [
        { step: 1, component: <TypeAccount form={form} data={specialitie} /> },
        { step: 2, component: <InterseingForm form={form} data={categories} /> },
        { step: 3, component: <PersonalInformation form={form} /> },
    ];

    const Next = () => {
        if (Stepper < 3) {
            setStepper(Stepper + 1)
        } else {
            setLoading(true);
            defaultHttp.post(apiRoutes.register, form)
                .then((response) => {
                    dispatch(restRegister());
                    navigator(webRoutes.login);
                    setLoading(false);
                })
                .catch(handleErrorResponse);

        }
    }
    const Previous = () => {

        if (Stepper > 1) {

            setStepper(Stepper - 1)
        }
    }
    return (
        <>

            <div className="container mx-auto py-10">

                <h1 className="text-3xl font-bold md:text-4xl  text-center mb-4 ">{t('website')}</h1>
                <p className="text-center mb-4">{t('hero_description')}</p>
                <div className="grid grid-cols-3 gap-3   transition-all mb-4">
                    {stepComponents.map((_, index) => (
                        <>
                            <div
                                key={index}
                                className={`relative h-1 rounded-full transition-all ${index < Stepper ? "bg-primary" : "bg-secondary"}`}
                            />
                        </>

                    ))}

                </div>
                <div className="flex flex-row justify-between">
                    <Button onClick={Previous} variant="outline">{t('previous')}</Button>
                    <Button onClick={Next}>{t('next')}</Button>
                </div>
                <div className="p-10 max-w-2xl mx-auto scroll-smooth">

                    {stepComponents.find(item => item.step === Stepper)?.component}



                </div>
                <div className="flex flex-row justify-between">
                    <Button onClick={Previous} variant="outline">{t('previous')}</Button>
                    <Button onClick={Next}>{t('next')}</Button>
                </div>

            </div >
        </>

    );
};

export default Register;










