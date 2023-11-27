import { TextHelper } from "@/helpers/TextHelper";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

type TSignInFormProps = {
  openSignUpModal: () => void;
  openIngredienteModal: () => void;
};

export const SignInForm = ({
  openSignUpModal,
  openIngredienteModal,
}: TSignInFormProps) => {
  const signInSchema = yup.object().shape({
    cpf: yup
      .string()
      .min(11)
      .max(11)
      .matches(/^[0-9]+$/i, "CPF deve conter apenas números"),
    password: yup
      .string()
      .min(6)
      .max(12)
      .required("Senha obrigatória")
      .matches(/^[a-z0-9]+$/i),
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(signInSchema),
  });

  const handleSignInSubmit = async () => {
    const loginResponse = await signIn("credentials", {
      cpf: getValues("cpf"),
      password: TextHelper.sha256(getValues("password")),
      redirect: false,
    });

    if (loginResponse?.status === 200) {
      toast.success("Login realizado com sucesso.");
      openIngredienteModal();
      return;
    }

    toast.error("CPF ou senha inválidos.");
  };

  const handleSignUpClick = () => {
    openSignUpModal();
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignInSubmit)}
      className="flex flex-col gap-4 text-white"
    >
      <h1 className="text-center text-2xl font-semibold text-gray-200">
        Login
      </h1>

      <div className="flex flex-col">
        <label
          htmlFor="cpf"
          className={`font-semibold ${
            errors.cpf ? "text-red-400" : "text-white"
          }`}
        >
          CPF
        </label>
        <input
          type="text"
          id="cpf"
          className={`rounded-md border-2 p-2 ${
            errors.cpf ? "border-red-400" : "border-gray-400"
          } text-black`}
          placeholder="xxxxxxxxxxx"
          {...register("cpf")}
        />
        {errors.cpf && errors.cpf.type === "required" && (
          <span className="text-sm text-red-400">
            Você deve fornecer um CPF válido.
          </span>
        )}

        {errors.cpf && errors.cpf.type === "min" && (
          <span className="text-sm text-red-400">
            CPF deve ter 11 caracteres.
          </span>
        )}

        {errors.cpf && errors.cpf.type === "max" && (
          <span className="text-sm text-red-400">
            CPF deve ter 11 caracteres.
          </span>
        )}

        {errors.cpf && errors.cpf.type === "matches" && (
          <span className="text-sm text-red-400">
            CPF deve conter apenas números.
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="password"
          className={`font-semibold ${
            errors.password ? "text-red-400" : "text-white"
          }`}
        >
          Senha
        </label>
        <input
          type="password"
          id="password"
          className={`rounded-md border-2 p-2 ${
            errors.password ? "border-red-400" : "border-gray-400"
          } text-black`}
          placeholder="*******"
          {...register("password")}
        />
        {errors.password && errors.password.type === "required" && (
          <span className="text-sm text-red-400">Senha é obrigatória.</span>
        )}

        {errors.password && errors.password.type === "min" && (
          <span className="text-sm text-red-400">
            Senha deve ter no mínimo 6 caracteres.
          </span>
        )}

        {errors.password && errors.password.type === "max" && (
          <span className="text-sm text-red-400">
            Senha deve ter no máximo 20 caracteres.
          </span>
        )}

        {errors.password && errors.password.type === "matches" && (
          <span className="text-sm text-red-400">
            Senha deve conter apenas letras e números.
          </span>
        )}
      </div>

      <button
        type="submit"
        className="rounded-xl bg-green-400 py-2 font-semibold text-white hover:bg-green-500"
      >
        Entrar
      </button>
      <span>
        Ainda não tem uma conta?{" "}
        <button
          onClick={handleSignUpClick}
          className="font-semibold text-blue-500 hover:underline"
          type="button"
        >
          Cadastre-se
        </button>
      </span>
    </form>
  );
};
