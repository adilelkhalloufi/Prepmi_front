import { zodResolver } from "@hookform/resolvers/zod"
import {   useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useEffect } from "react"
import i18next from "i18next"

 import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
 import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
 import citiesData from "@/data/cities.json"
import { Specialitie } from "@/interfaces/admin"
import { defaultHttp } from "@/utils/http"
import { apiRoutes } from "@/routes/api"
 
 
const profileFormSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(50, {
      message: "First name must not be longer than 50 characters.",
    }),
  last_name: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(50, {
      message: "Last name must not be longer than 50 characters.",
    }),
  email: z
    .string({
      required_error: "Please enter your email.",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 digits.",
    })
    .max(15, {
      message: "Phone number must not be longer than 15 digits.",
    }),
  address: z
    .string()
    .min(5, {
      message: "Address must be at least 5 characters.",
    })
    .max(200, {
      message: "Address must not be longer than 200 characters.",
    }),
  city_id: z
    .string({
      required_error: "Please select a city.",
    }),
  role: z
    .string({
      required_error: "Please select a role.",
    }),
  status: z
    .string()
    .optional(),
  specialitie_id: z
    .string()
    .optional(),
  coins: z
    .number()
    .min(0, {
      message: "Coins must be a positive number.",
    })
    .optional(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  city_id: "",
  specialitie_id: "",
  password: "",
}

export function ProfileForm() {
  const [specialities, setSpecialities] = useState<Specialitie[]>([])

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  // Fetch specialities on component mount
  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const response = await defaultHttp.get(apiRoutes.specialities)
        setSpecialities(response.data)
      } catch (error) {
        console.error('Failed to fetch specialities:', error)
      }
    }

    fetchSpecialities()
  }, [])

  function onSubmit(data: ProfileFormValues) {
    console.log(data)
    // Handle form submission here
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* First Name */}
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter your address"
                  className="resize-none"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City */}
        <FormField
          control={form.control}
          name="city_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {citiesData.map((city) => (
                    <SelectItem key={city.id} value={city.id.toString()}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role */}
        {/* <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(RoleEnum).map(([key, value]) => (
                    <SelectItem key={value} value={value.toString()}>
                      {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* Status - Read Only */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  readOnly 
                  className="bg-muted cursor-not-allowed"
                  placeholder="Status will be displayed here"
                />
              </FormControl>
              <FormDescription>
                Status is managed by administrators
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Speciality */}
        <FormField
          control={form.control}
          name="specialitie_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Speciality</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a speciality" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {specialities.map((speciality) => (
                    <SelectItem key={speciality.id} value={speciality.id.toString()}>
                      {speciality.name[i18next.language] || speciality.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Coins - Read Only */}
        <FormField
          control={form.control}
          name="coins"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coins</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  {...field}
                  readOnly 
                  className="bg-muted cursor-not-allowed"
                  placeholder="Coins balance will be displayed here"
                />
              </FormControl>
              <FormDescription>
                Coins balance is managed by the system
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="Enter new password (optional)" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Leave blank to keep current password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update Profile</Button>
      </form>
    </Form>
  )
}