import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Modal from "./Modal";

interface SignInModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (data: any) => void;
  handleSignUpClick: () => void;
}

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

const SignInModal: React.FC<SignInModalProps> = ({
  onSubmit,
  handleSignUpClick,
  isOpen,
  onRequestClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(signInSchema),
  });

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h1 className="text-2xl font-semibold text-center text-gray-800">
        Login
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 text-black"
      >
        <div className="flex flex-col">
          <label
            htmlFor="cpf"
            className={`font-semibold ${
              errors.cpf ? "text-red-400" : "text-gray-800"
            }`}
          >
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            className={`border-2 rounded-md p-2 ${
              errors.cpf ? "border-red-400" : "border-gray-400"
            }`}
            placeholder="xxxxxxxxxxx"
            {...register("cpf")}
          />
          {errors.cpf && errors.cpf.type === "required" && (
            <span className="text-red-400 text-sm">
              Você deve fornecer um CPF válido.
            </span>
          )}

          {errors.cpf && errors.cpf.type === "min" && (
            <span className="text-red-400 text-sm">
              CPF deve ter 11 caracteres.
            </span>
          )}

          {errors.cpf && errors.cpf.type === "max" && (
            <span className="text-red-400 text-sm">
              CPF deve ter 11 caracteres.
            </span>
          )}

          {errors.cpf && errors.cpf.type === "matches" && (
            <span className="text-red-400 text-sm">
              CPF deve conter apenas números.
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className={`font-semibold ${
              errors.password ? "text-red-400" : "text-gray-800"
            }`}
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            className={`border-2 rounded-md p-2 ${
              errors.password ? "border-red-400" : "border-gray-400"
            }`}
            placeholder="*******"
            {...register("password")}
          />
          {errors.password && errors.password.type === "required" && (
            <span className="text-red-400 text-sm">Senha é obrigatória.</span>
          )}

          {errors.password && errors.password.type === "min" && (
            <span className="text-red-400 text-sm">
              Senha deve ter no mínimo 6 caracteres.
            </span>
          )}

          {errors.password && errors.password.type === "max" && (
            <span className="text-red-400 text-sm">
              Senha deve ter no máximo 20 caracteres.
            </span>
          )}

          {errors.password && errors.password.type === "matches" && (
            <span className="text-red-400 text-sm">
              Senha deve conter apenas letras e números.
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-400 py-2 rounded-xl text-white font-semibold hover:bg-green-500"
        >
          Entrar
        </button>
        <span>
          Ainda não tem uma conta?{" "}
          <button
            onClick={handleSignUpClick}
            className="text-blue-500 font-semibold hover:underline"
          >
            Cadastre-se
          </button>
        </span>
      </form>
    </Modal>
  );
};

export default SignInModal;
