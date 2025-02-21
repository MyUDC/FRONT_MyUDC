"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { RiErrorWarningFill } from "react-icons/ri";
import Input from "@/shared/components/ui/Input";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@radix-ui/react-toast";

import { SignIn, SignUp } from "@/features/auth/actions";
import { useFormSwiperStore } from "@/stores/useFormSwiperStore";
import { ResponseSchema } from "@/shared/types/ResponseSchema";
import { Role } from "@prisma/client";
import { signIn } from "next-auth/react";

type FormInputs = {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
};

export default function RegisterForm() {
  // ----[States and hooks]----
  const router = useRouter();
  const { values } = useFormSwiperStore();
  const { toast } = useToast();
  const [signUpErrorMessage, setSignUpErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();
  const passwordInpValue = watch("password");

  // ----[functions]----
  const onSubmit = async (data: FormInputs) => {
    setSignUpErrorMessage("");
    const {
      profileType: { profileType } = {},
      studentData: { careerId, semester, accountNumber } = {},
    } = values || {};
    const { email, username, password } = data;

    let resp: ResponseSchema;

    try {
      if (profileType === Role.STUDENT) {
        resp = await SignUp({
          email,
          username,
          password,
          role: profileType!,
          careerId,
          semester: Number(semester),
          accountNumber,
        });
      } else if (profileType === Role.ASPIRANT) {
        resp = await SignUp({
          email,
          username,
          password,
          role: profileType!,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error al registrarse",
          description: "No se pudo determinar el tipo de perfil",
          action: <ToastAction altText="Entendido">Entendido</ToastAction>,
        });
        return;
      }

      if (!resp.ok) {
        setSignUpErrorMessage(resp.message);
        toast({
          variant: "destructive",
          title: "Error al registrarse",
          description: resp.message,
          action: <ToastAction altText="Entendido">Entendido</ToastAction>,
        });
        return;
      }

      // Usar signIn de next-auth directamente
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Error al iniciar sesión",
          description: "No se pudo iniciar sesión automáticamente",
          action: <ToastAction altText="Entendido">Entendido</ToastAction>,
        });
        return;
      }

      // Si todo sale bien, redirigir
      router.refresh();
      router.replace("/home");
      router.refresh();
    } catch (error) {
      console.error("Error during registration:", error);
      toast({
        variant: "destructive",
        title: "Error al registrarse",
        description: "Ocurrió un error inesperado",
        action: <ToastAction altText="Entendido">Entendido</ToastAction>,
      });
    }
  };

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Registro
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ---[ Email field ]--- */}
        <div>
          <Input
            title="Correo"
            id="email"
            placeholder="Agrega un correo"
            type="email"
            autoComplete="email"
            formHandler={register("email", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              pattern: {
                value: RegExp(
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                ),
                message: "Esto no luce como un email",
              },
            })}
            error={errors.email?.message}
          />
        </div>

        {/* ---[ Username field ]--- */}
        <div>
          <Input
            title="Nombre de usuario"
            id="username"
            placeholder="Agrega un nombre de usuario"
            type="text"
            autoComplete="username"
            formHandler={register("username", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              minLength: {
                value: 4,
                message: "Introduce al menos 4 caracteres",
              },
              maxLength: {
                value: 20,
                message: "Introduce máximo 20 caracteres",
              },
              pattern: {
                value: RegExp(/^[a-zA-Z0-9_]*$/),
                message: "Solo se permiten letras, números y guiones bajos",
              },
            })}
            error={errors.username?.message}
          />
        </div>

        {/* ---[ Password field ]--- */}
        <div>
          <Input
            title="Contraseña"
            id="password"
            placeholder="Agrega una contraseña"
            type="password"
            autoComplete="new-password"
            formHandler={register("password", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              minLength: {
                value: 8,
                message: "Introduce al menos 8 caracteres",
              },
            })}
            error={errors.password?.message}
          />
        </div>

        {/* ---[ Confirm password field ]--- */}
        <div>
          <Input
            title="Confirma contraseña"
            id="confirm_password"
            placeholder="Repite tu contraseña"
            type="password"
            autoComplete="off"
            formHandler={register("confirm_password", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              validate: (value) =>
                value === passwordInpValue || "Las contraseñas no coinciden",
            })}
            error={errors.confirm_password?.message}
          />
        </div>

        {/* ---[ Error message ]--- */}
        {signUpErrorMessage && (
          <div className="flex items-center text-red-500 text-xs mt-1">
            <RiErrorWarningFill className="mr-1" />
            <span>{signUpErrorMessage}</span>
          </div>
        )}

        {/* ---[ Submit button ]--- */}
        <div className="pt-2">
          <Button variant="green" className="w-full" loading={isSubmitting}>
            {isSubmitting ? "Cargando..." : "Registrarse"}
          </Button>
        </div>
      </form>
    </div>
  );
}
