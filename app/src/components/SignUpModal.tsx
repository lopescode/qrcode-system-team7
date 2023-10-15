import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Modal from "./Modal";

interface SignUpModalProps {
  onSubmit: (data: any) => void;
  handleSignInClick: () => void;
  onRequestClose: () => void;
  isOpen: boolean;
}

const signUpSchema = yup.object().shape({
  cpf: yup
    .string()
    .min(11)
    .max(11)
    .required()
    .matches(/^[0-9]+$/i),
  password: yup.string().min(6).max(20).required(),
  firstName: yup
    .string()
    .max(255)
    .required()
    .matches(/^[a-zA-Zà-úÀ-Ú]+$/i),
  lastName: yup
    .string()
    .max(255)
    .required()
    .matches(/^[a-zA-Zà-úÀ-Ú]+$/i),
  streetAddress: yup
    .string()
    .max(255)
    .required()
    .matches(/^[a-zA-Zà-úÀ-Ú\s]+$/i),
  neighborhood: yup
    .string()
    .max(255)
    .required()
    .matches(/^[a-zA-Zà-úÀ-Ú\s]+$/i),
  city: yup
    .string()
    .max(255)
    .required()
    .matches(/^[a-zA-Zà-úÀ-Ú\s]+$/i),
  state: yup
    .string()
    .min(2)
    .max(2)
    .required()
    .matches(/^[A-Z]+$/i),
  country: yup
    .string()
    .max(255)
    .required()
    .matches(/^[a-zA-Zà-úÀ-Ú]+$/i),
  postalCode: yup
    .string()
    .min(8)
    .max(8)
    .required()
    .matches(/^[0-9]+$/i),
  countryCode: yup
    .string()
    .min(2)
    .max(2)
    .required()
    .matches(/^[0-9]+$/i),
  areaCode: yup
    .string()
    .min(2)
    .max(2)
    .required()
    .matches(/^[0-9]+$/i),
  phoneNumber: yup
    .string()
    .min(9)
    .max(9)
    .required()
    .matches(/^[0-9]+$/i),
});

const SignUpModal: React.FC<SignUpModalProps> = ({
  onSubmit,
  handleSignInClick,
  isOpen,
  onRequestClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(signUpSchema),
  });

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h1 className="text-2xl font-semibold text-center text-gray-800">
        Cadastre-se
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 text-black"
      >
        <section>
          <h1 className="font-bold my-4 text-lg text-gray-500">
            Informações de Login
          </h1>

          <div className="flex gap-2">
            <div className="flex flex-col w-1/2">
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
                placeholder="XXXXXXXXXXX"
                {...register("cpf")}
              />
              {errors.cpf && errors.cpf.type === "required" && (
                <span className="text-red-400 text-sm">CPF é obrigatório.</span>
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

            <div className="flex flex-col flex-auto">
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
                <span className="text-red-400 text-sm">
                  Senha é obrigatória.
                </span>
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
            </div>
          </div>
        </section>

        <section>
          <h1 className="font-bold my-4 text-lg text-gray-500">
            Informações pessoais
          </h1>

          <div className="flex gap-2">
            <div className="flex flex-col w-1/2">
              <label
                htmlFor="firstName"
                className={`font-semibold ${
                  errors.firstName ? "text-red-400" : "text-gray-800"
                }`}
              >
                Primeiro Nome
              </label>
              <input
                type="text"
                id="firstName"
                className={`border-2 rounded-md p-2 ${
                  errors.firstName ? "border-red-400" : "border-gray-400"
                }`}
                {...register("firstName")}
                placeholder="Digite seu nome"
              />
              {errors.firstName && errors.firstName.type === "required" && (
                <span className="text-red-400 text-sm">
                  Primeiro nome é obrigatório.
                </span>
              )}

              {errors.firstName && errors.firstName.type === "max" && (
                <span className="text-red-400 text-sm">
                  Primeiro nome deve ter no máximo 255 caracteres.
                </span>
              )}

              {errors.firstName && errors.firstName.type === "matches" && (
                <span className="text-red-400 text-sm">
                  Primeiro nome deve conter apenas letras.
                </span>
              )}
            </div>

            <div className="flex flex-col flex-auto">
              <label
                htmlFor="lastName"
                className={`font-semibold ${
                  errors.lastName ? "text-red-400" : "text-gray-800"
                }`}
              >
                Último Nome
              </label>
              <input
                type="text"
                id="lastName"
                className={`border-2 rounded-md p-2 ${
                  errors.lastName ? "border-red-400" : "border-gray-400"
                }`}
                {...register("lastName")}
                placeholder="Digite seu último nome"
              />
              {errors.lastName && errors.lastName.type === "required" && (
                <span className="text-red-400 text-sm">
                  Último nome é obrigatório.
                </span>
              )}

              {errors.lastName && errors.lastName.type === "max" && (
                <span className="text-red-400 text-sm">
                  Último nome deve ter no máximo 255 caracteres.
                </span>
              )}

              {errors.lastName && errors.lastName.type === "matches" && (
                <span className="text-red-400 text-sm">
                  Último nome deve conter apenas letras.
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col w-1/5">
              <label
                htmlFor="countryCode"
                className={`font-semibold ${
                  errors.countryCode ? "text-red-400" : "text-gray-800"
                }`}
              >
                COD
              </label>
              <input
                type="text"
                id="countryCode"
                className={`border-2 rounded-md p-2 ${
                  errors.countryCode ? "border-red-400" : "border-gray-400"
                }`}
                placeholder="XX"
                {...register("countryCode")}
              />
              {errors.countryCode && errors.countryCode.type === "required" && (
                <span className="text-red-400 text-sm">
                  Código do País é obrigatório.
                </span>
              )}

              {errors.countryCode &&
                (errors.countryCode.type === "min" ||
                  errors.countryCode.type === "max") && (
                  <span className="text-red-400 text-sm">
                    Código do País deve ter 2 caracteres.
                  </span>
                )}

              {errors.countryCode && errors.countryCode.type === "matches" && (
                <span className="text-red-400 text-sm">
                  Código do País deve conter apenas números.
                </span>
              )}
            </div>

            <div className="flex flex-col w-1/5">
              <label
                htmlFor="areaCode"
                className={`font-semibold ${
                  errors.areaCode ? "text-red-400" : "text-gray-800"
                }`}
              >
                DDD
              </label>
              <input
                type="text"
                id="areaCode"
                className={`border-2 rounded-md p-2 ${
                  errors.areaCode ? "border-red-400" : "border-gray-400"
                }`}
                placeholder="XX"
                {...register("areaCode")}
              />
              {errors.areaCode && errors.areaCode.type === "required" && (
                <span className="text-red-400 text-sm">DDD é obrigatório.</span>
              )}

              {errors.areaCode &&
                (errors.areaCode.type === "max" ||
                  errors.areaCode.type === "min") && (
                  <span className="text-red-400 text-sm">
                    DDD deve ter 2 caracteres.
                  </span>
                )}

              {errors.areaCode && errors.areaCode.type === "matches" && (
                <span className="text-red-400 text-sm">
                  DDD deve conter apenas letras.
                </span>
              )}
            </div>

            <div className="flex flex-col flex-auto">
              <label
                htmlFor="phoneNumber"
                className={`font-semibold ${
                  errors.phoneNumber ? "text-red-400" : "text-gray-800"
                }`}
              >
                Celular
              </label>
              <input
                type="text"
                id="phoneNumber"
                className={`border-2 rounded-md p-2 ${
                  errors.phoneNumber ? "border-red-400" : "border-gray-400"
                }`}
                placeholder="XXXXXXXXX"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && errors.phoneNumber.type === "required" && (
                <span className="text-red-400 text-sm">
                  Telefone é obrigatório.
                </span>
              )}

              {errors.phoneNumber &&
                (errors.phoneNumber.type === "max" ||
                  errors.phoneNumber.type === "min") && (
                  <span className="text-red-400 text-sm">
                    Telefone deve ter 9 caracteres.
                  </span>
                )}

              {errors.phoneNumber && errors.phoneNumber.type === "matches" && (
                <span className="text-red-400 text-sm">
                  Telefone deve conter apenas letras.
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col flex-auto">
              <label
                htmlFor="streetAddress"
                className={`font-semibold ${
                  errors.streetAddress ? "text-red-400" : "text-gray-800"
                }`}
              >
                Endereço
              </label>
              <input
                type="text"
                id="streetAddress"
                className={`border-2 rounded-md p-2 ${
                  errors.streetAddress ? "border-red-400" : "border-gray-400"
                }`}
                placeholder="Rua. Exemplo, 123"
                {...register("streetAddress")}
              />
              {errors.streetAddress &&
                errors.streetAddress.type === "required" && (
                  <span className="text-red-400 text-sm">
                    Endereço é obrigatório.
                  </span>
                )}

              {errors.streetAddress && errors.streetAddress.type === "max" && (
                <span className="text-red-400 text-sm">
                  Endereço deve ter no máximo 255 caracteres.
                </span>
              )}

              {errors.streetAddress &&
                errors.streetAddress.type === "matches" && (
                  <span className="text-red-400 text-sm">
                    Endereço deve conter apenas letras.
                  </span>
                )}
            </div>

            <div className="flex flex-col w-2/5">
              <label
                htmlFor="neighborhood"
                className={`font-semibold ${
                  errors.neighborhood ? "text-red-400" : "text-gray-800"
                }`}
              >
                Bairro
              </label>
              <input
                type="text"
                id="neighborhood"
                className={`border-2 rounded-md p-2 ${
                  errors.neighborhood ? "border-red-400" : "border-gray-400"
                }`}
                placeholder="Bairro Exemplo"
                {...register("neighborhood")}
              />
              {errors.neighborhood &&
                errors.neighborhood.type === "required" && (
                  <span className="text-red-400 text-sm">
                    Bairro é obrigatório.
                  </span>
                )}

              {errors.neighborhood && errors.neighborhood.type === "max" && (
                <span className="text-red-400 text-sm">
                  Bairro deve ter no máximo 255 caracteres.
                </span>
              )}

              {errors.neighborhood &&
                errors.neighborhood.type === "matches" && (
                  <span className="text-red-400 text-sm">
                    Bairro deve conter apenas letras.
                  </span>
                )}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col flex-auto">
              <label
                htmlFor="city"
                className={`font-semibold ${
                  errors.city ? "text-red-400" : "text-gray-800"
                }`}
              >
                Cidade
              </label>
              <input
                type="text"
                id="city"
                className={`border-2 rounded-md p-2 ${
                  errors.city ? "border-red-400" : "border-gray-400"
                }`}
                placeholder="Cidade Exemplo"
                {...register("city")}
              />
              {errors.city && errors.city.type === "required" && (
                <span className="text-red-400 text-sm">
                  Cidade é obrigatório.
                </span>
              )}

              {errors.city && errors.city.type === "max" && (
                <span className="text-red-400 text-sm">
                  Cidade deve ter no máximo 255 caracteres.
                </span>
              )}

              {errors.city && errors.city.type === "matches" && (
                <span className="text-red-400 text-sm">
                  Cidade deve conter apenas letras.
                </span>
              )}
            </div>

            <div className="flex flex-col w-1/12">
              <label
                htmlFor="state"
                className={`font-semibold ${
                  errors.state ? "text-red-400" : "text-gray-800"
                }`}
              >
                Estado
              </label>
              <input
                type="text"
                id="state"
                className={`border-2 rounded-md p-2 ${
                  errors.state ? "border-red-400" : "border-gray-400"
                }`}
                {...register("state")}
                placeholder="XX"
              />
              {errors.state && errors.state.type === "required" && (
                <span className="text-red-400 text-sm">
                  Estado é obrigatório.
                </span>
              )}

              {errors.state &&
                (errors.state.type === "max" ||
                  errors.state.type === "min") && (
                  <span className="text-red-400 text-sm">
                    Estado deve ter 2 caracteres.
                  </span>
                )}

              {errors.state && errors.state.type === "matches" && (
                <span className="text-red-400 text-sm">
                  Estado deve conter apenas letras.
                </span>
              )}
            </div>

            <div className="flex flex-col flex-auto">
              <label
                htmlFor="country"
                className={`font-semibold ${
                  errors.country ? "text-red-400" : "text-gray-800"
                }`}
              >
                País
              </label>
              <input
                type="text"
                id="country"
                className={`border-2 rounded-md p-2 ${
                  errors.country ? "border-red-400" : "border-gray-400"
                }`}
                {...register("country")}
                placeholder="Brasil"
              />
              {errors.country && errors.country.type === "required" && (
                <span className="text-red-400 text-sm">
                  País é obrigatório.
                </span>
              )}

              {errors.country && errors.country.type === "max" && (
                <span className="text-red-400 text-sm">
                  País deve ter no máximo 255 caracteres.
                </span>
              )}

              {errors.country && errors.country.type === "matches" && (
                <span className="text-red-400 text-sm">
                  País deve conter apenas letras.
                </span>
              )}
            </div>

            <div className="flex flex-col flex-auto">
              <label
                htmlFor="postalCode"
                className={`font-semibold ${
                  errors.postalCode ? "text-red-400" : "text-gray-800"
                }`}
              >
                CEP
              </label>
              <input
                type="text"
                id="postalCode"
                className={`border-2 rounded-md p-2 ${
                  errors.postalCode ? "border-red-400" : "border-gray-400"
                }`}
                {...register("postalCode")}
                placeholder="XXXXXXXX"
              />
              {errors.postalCode && errors.postalCode.type === "required" && (
                <span className="text-red-400 text-sm">
                  Código postal é obrigatório.
                </span>
              )}

              {errors.postalCode &&
                (errors.postalCode.type === "min" ||
                  errors.postalCode.type === "max") && (
                  <span className="text-red-400 text-sm">
                    Código postal deve ter 8 caracteres.
                  </span>
                )}

              {errors.postalCode && errors.postalCode.type === "matches" && (
                <span className="text-red-400 text-sm">
                  Código postal deve conter apenas letras.
                </span>
              )}
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="bg-green-400 py-2 rounded-xl text-white font-semibold hover:bg-green-500"
        >
          Enviar
        </button>
        <span className="text-black">
          Já possui uma conta?{" "}
          <button
            onClick={handleSignInClick}
            className="text-blue-500 font-semibold hover:underline"
          >
            Logar-se
          </button>
        </span>
      </form>
    </Modal>
  );
};

export default SignUpModal;
