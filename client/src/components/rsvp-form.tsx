import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertRsvpSchema, type InsertRsvp } from "@shared/schema";
import { useState } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const phoneRegex =
    /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;

  const form = useForm<InsertRsvp>({
    resolver: zodResolver(
      insertRsvpSchema.extend({
        email: z
          .string()
          .regex(
            phoneRegex,
            "Ingresa un número de celular válido de Argentina",
          ),
      }),
    ),
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

  const handleSubmit = async (data: InsertRsvp) => {
    setIsSubmitting(true);
    
    try {
      // Al enviar el primer formulario a formsubmit.co, te llegará un email de confirmación
      // que necesitarás activar para empezar a recibir formularios en tu email.
      const response = await fetch('https://formsubmit.co/amconsultingar@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nombre: data.name,
          celular: data.email,
          asistencia: data.attending ? 'Sí' : 'No',
          preferencias: data.dietaryRestrictions || 'Lo que venga',
          micro: data.usesBus ? 'Sí' : 'No',
          dni: data.dni || 'No proporcionado',
          mensaje: data.message || 'Sin mensaje',
          _subject: `RSVP JU XV - ${data.name}`,
        })
      });

      if (response.ok) {
        toast({
          title: "¡RSVP Enviado!",
          description: "Gracias por confirmar tu asistencia.",
        });
        form.reset();
        setSubmitted(true);
      } else {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error: any) {
      toast({
        title: "Error al enviar tu asistencia",
        description: "Por favor intenta nuevamente más tarde",
        variant: "destructive",
      });
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl text-center text-white mb-8">¡Gracias!</h2>
        <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg mb-6">
          <p className="text-white mb-4">Tu confirmación ha sido recibida. ¡Nos vemos en la fiesta!</p>
          <Button onClick={() => setSubmitted(false)}>Enviar otra respuesta</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6">
      <h2 className="text-3xl text-center text-white mb-8">RSVP</h2>
      <h4 className="text-xl text-center text-white mb-8">Porfa, completá los datos de cada persona</h4>
      
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
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
                  <FormLabel className="text-base">¿Vas a venir?</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value === true}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("attending") === true && (
            <>
              <FormField
                control={form.control}
                name="dietaryRestrictions"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Contame qué preferís comer</FormLabel>
                    <FormControl>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        value={value || ""}
                        onChange={onChange}
                        {...field}
                      >
                        <option value="Lo que venga">Lo que venga</option>
                        <option value="Soy Veggie">Soy Veggie</option>
                        <option value="Cuidado con el pan que soy Celiaco">
                          Cuidado con el pan que soy Celiaco
                        </option>
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
                      <FormLabel className="text-base">
                        ¿Queres venir en micro?
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value === true}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("usesBus") === true && (
                <FormField
                  control={form.control}
                  name="dni"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Si venís en micro, necesito tu DNI</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej: 12345678"
                          value={field.value || ""}
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 8);
                            field.onChange(value);
                          }}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </>
          )}

          <FormField
            control={form.control}
            name="message"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>¿Queres dejarme un mensaje?</FormLabel>
                <FormControl>
                  <Textarea
                    value={value || ""}
                    onChange={onChange}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? "Enviando..." 
              : form.watch("attending") === true 
                ? "Confirmo Asistencia" 
                : "Perdón! Pero me pierdo la fiesta"}
          </Button>
        </form>
      </Form>
    </div>
  );
}