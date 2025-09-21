import { CreditCardIcon, DollarSignIcon, WalletCardsIcon } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { RoleEnum } from "@/enum/RoleEnum";
import i18next from "i18next";
import { useDispatch } from "react-redux";
import { register } from "@/store/slices/registerSlice";

const TypeAccount = ({ form, data = [] }) => {
    const dispatch = useDispatch()
    const dataFilter = data.filter((item) => item.type == form.role)
    return (
        <div>

            <Card   >
                <CardHeader>
                    <CardTitle>{i18next.t('account.type')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <RadioGroup defaultValue="buyer" 
                        className="grid grid-cols-2 gap-4 mb-4"
                        defaultChecked={form.role}
                        onValueChange={(e) => {
                            dispatch(register({ key: "role", value: e }));
                        }}
                    >

                        <div  >
                            <RadioGroupItem
                                value={RoleEnum.BUYER.toString()}
                                id="buyer"
                                className="peer sr-only"
                                checked={form.role === RoleEnum.BUYER.toString()}

                            />
                            <Label
                                htmlFor="buyer"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <WalletCardsIcon className="mb-3 h-6 w-6" />
                                {i18next.t('buyer')}
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem value={RoleEnum.SELLER.toString()}
                                id="seller"
                                checked={form.role === RoleEnum.SELLER.toString()}
                                className="peer sr-only"

                            />
                            <Label
                                htmlFor="seller"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <CreditCardIcon className="mb-3 h-6 w-6" />
                                {i18next.t('seller')}
                            </Label>
                        </div>

                    </RadioGroup>
                      <Label className="text-sm font-medium">
                        {i18next.t('register.form.company')}
                    </Label>      
                    <Input
                        placeholder={i18next.t('register.form.company')}
                        defaultValue={form.company_name}
                        onChange={(e) => dispatch(register({ key: "company_name", value: e.target.value }))}
                    />
                    <Label className="text-sm font-medium">
                        {i18next.t('register.form.Specialitie')}
                    </Label>

                    <Select
                        placeholder={i18next.t('register.form.Specialitie')}
                        className="w-full"
                        onValueChange={(e) =>
                            dispatch(register({ key: "specialitie_id", value: e }))
                        }
                        defaultValue={form.specialitie_id}
                    
                    >
                        <SelectTrigger >
                            <SelectValue placeholder={i18next.t('register.form.Specialitie')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{i18next.t('register.form.Specialitie')}</SelectLabel>
                                {dataFilter.map((item) => (
                                    <SelectItem key={item.id} value={item.id}>{item.name[i18next.language]}</SelectItem>
                                ))}

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

        </div>
    );
}

export default TypeAccount;