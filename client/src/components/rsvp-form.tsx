import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertRsvpSchema, type InsertRsvp } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export function RsvpForm() {
  const { toast } = useToast();
  const phoneRegex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;

const form = useForm<InsertRsvp>({
    resolver: zodResolver(insertRsvpSchema.extend({
      email: z.string().regex(phoneRegex, 'Ingresa un número de celular válido de Argentina')
    })),
    defaultValues: {
      attending: true,
      guests: "1",
      dietaryRestrictions: "Lo que venga",
      message: "",
      name: "",
      email: "",
      usesBus: false,
      dni: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertRsvp) => {
      await apiRequest("POST", "/api/rsvps", data);
    },
    onSuccess: () => {
      toast({
        title: "¡RSVP Enviado!",
        description: "Gracias por confirmar tu asistencia.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error al enviar RSVP",
        description: error instanceof Error ? error.message : "Por favor intenta nuevamente más tarde",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl text-center text-white mb-8">RSVP</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tu nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresá tu nombre completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tu celular</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Ej: 11XXXXXXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="attending"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">¿Asistirás?</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dietaryRestrictions"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Avisanos qué preferís comer</FormLabel>
                <FormControl>
                  <select 
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={value || ""} 
                    onChange={onChange} 
                    {...field}
                  >
                    <option value="Lo que venga">Lo que venga</option>
                    <option value="Soy Veggie">Soy Veggie</option>
                    <option value="Cuidado con el pan que soy Celiaco">Cuidado con el pan que soy Celiaco</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="usesBus"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">¿Venís en el micro?</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {form.watch("usesBus") && (
            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Si venís en micro, necesito tu DNI</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ej: 12345678" 
                      {...field} 
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 8);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="message"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Mensaje</FormLabel>
                <FormControl>
                  <Textarea value={value || ""} onChange={onChange} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Enviando..." : "Enviar RSVP"}
          </Button>
        </form>
      </Form>
    </div>
  );
}