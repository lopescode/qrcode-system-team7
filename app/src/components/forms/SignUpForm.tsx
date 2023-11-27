import { HttpRequestHelper } from "@/helpers/HTTPRequestHelper";
import { TextHelper } from "@/helpers/TextHelper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

type TSignUpFormProps = {
  openSignInModal: () => void;
  closeSignUpModal: () => void;
};

export const SignUpForm = ({
  openSignInModal,
  closeSignUpModal,
}: TSignUpFormProps) => {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(signUpSchema),
  });

  const handleSubmitSignUp = async () => {
    const response = await HttpRequestHelper.post("auth/sign-up", {
      cpf: getValues("cpf"),
      password: TextHelper.sha256(getValues("password")),
      firstName: getValues("firstName"),
      lastName: getValues("lastName"),
      streetAddress: getValues("streetAddress"),
      neighborhood: getValues("neighborhood"),
      city: getValues("city"),
      state: getValues("state"),
      country: getValues("country"),
      postalCode: getValues("postalCode"),
      countryCode: getValues("countryCode"),
      areaCode: getValues("areaCode"),
      phoneNumber: getValues("phoneNumber"),
    });

    if (response?.statusCode === 200) {
      toast.success("Cadastro realizado com sucesso!");
      closeSignUpModal();
      openSignInModal();
      return;
    }

    toast.error(
      response?.message ?? "Houve um erro ao cadastrar este usuário."
    );
  };

  const handleSignInClick = () => {
    closeSignUpModal();
    openSignInModal();
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSignUp)}
      className="flex flex-col gap-2"
    >
      <h1 className="text-center text-2xl font-semibold text-white">
        Cadastre-se
      </h1>
      <section>
        <h1 className="my-4 text-lg font-bold text-gray-200">
          Informações de Login
        </h1>

        <div className="flex gap-2">
          <div className="flex w-1/2 flex-col">
            <label
              htmlFor="cpf"
              className={`font-semibold ${
                errors.cpf ? "text-red-400" : "text-white"
              } text-black`}
            >
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              className={`rounded-md border-2 p-2 ${
                errors.cpf ? "border-red-400" : "border-gray-200"
              } text-black`}
              placeholder="XXXXXXXXXXX"
              {...register("cpf")}
            />
            {errors.cpf && errors.cpf.type === "required" && (
              <span className="text-sm text-red-400">CPF é obrigatório.</span>
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

          <div className="flex flex-auto flex-col">
            <label
              htmlFor="password"
              className={`font-semibold ${
                errors.password ? "text-red-400" : "text-white"
              } text-black`}
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
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h1 className="mb-2 mt-4 text-lg font-bold text-gray-200">
          Informações pessoais
        </h1>

        <div className="flex gap-2">
          <div className="flex w-1/2 flex-col">
            <label
              htmlFor="firstName"
              className={`font-semibold ${
                errors.firstName ? "text-red-400" : "text-white"
              } text-black`}
            >
              Primeiro Nome
            </label>
            <input
              type="text"
              id="firstName"
              className={`rounded-md border-2 p-2 ${
                errors.firstName ? "border-red-400" : "border-gray-400"
              } text-black`}
              {...register("firstName")}
              placeholder="Digite seu nome"
            />
            {errors.firstName && errors.firstName.type === "required" && (
              <span className="text-sm text-red-400">
                Primeiro nome é obrigatório.
              </span>
            )}

            {errors.firstName && errors.firstName.type === "max" && (
              <span className="text-sm text-red-400">
                Primeiro nome deve ter no máximo 255 caracteres.
              </span>
            )}

            {errors.firstName && errors.firstName.type === "matches" && (
              <span className="text-sm text-red-400">
                Primeiro nome deve conter apenas letras.
              </span>
            )}
          </div>

          <div className="flex flex-auto flex-col">
            <label
              htmlFor="lastName"
              className={`font-semibold ${
                errors.lastName ? "text-red-400" : "text-white"
              } text-black`}
            >
              Último Nome
            </label>
            <input
              type="text"
              id="lastName"
              className={`rounded-md border-2 p-2 ${
                errors.lastName ? "border-red-400" : "border-gray-400"
              } text-black`}
              {...register("lastName")}
              placeholder="Digite seu último nome"
            />
            {errors.lastName && errors.lastName.type === "required" && (
              <span className="text-sm text-red-400">
                Último nome é obrigatório.
              </span>
            )}

            {errors.lastName && errors.lastName.type === "max" && (
              <span className="text-sm text-red-400">
                Último nome deve ter no máximo 255 caracteres.
              </span>
            )}

            {errors.lastName && errors.lastName.type === "matches" && (
              <span className="text-sm text-red-400">
                Último nome deve conter apenas letras.
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex w-1/5 flex-col">
            <label
              htmlFor="countryCode"
              className={`font-semibold ${
                errors.countryCode ? "text-red-400" : "text-white"
              } text-black`}
            >
              COD
            </label>
            <input
              type="text"
              id="countryCode"
              className={`rounded-md border-2 p-2 ${
                errors.countryCode ? "border-red-400" : "border-gray-400"
              } text-black`}
              placeholder="XX"
              {...register("countryCode")}
            />
            {errors.countryCode && errors.countryCode.type === "required" && (
              <span className="text-sm text-red-400">
                Código do País é obrigatório.
              </span>
            )}

            {errors.countryCode &&
              (errors.countryCode.type === "min" ||
                errors.countryCode.type === "max") && (
                <span className="text-sm text-red-400">
                  Código do País deve ter 2 caracteres.
                </span>
              )}

            {errors.countryCode && errors.countryCode.type === "matches" && (
              <span className="text-sm text-red-400">
                Código do País deve conter apenas números.
              </span>
            )}
          </div>

          <div className="flex w-1/5 flex-col">
            <label
              htmlFor="areaCode"
              className={`font-semibold ${
                errors.areaCode ? "text-red-400" : "text-white"
              } text-black`}
            >
              DDD
            </label>
            <input
              type="text"
              id="areaCode"
              className={`rounded-md border-2 p-2 ${
                errors.areaCode ? "border-red-400" : "border-gray-400"
              } text-black`}
              placeholder="XX"
              {...register("areaCode")}
            />
            {errors.areaCode && errors.areaCode.type === "required" && (
              <span className="text-sm text-red-400">DDD é obrigatório.</span>
            )}

            {errors.areaCode &&
              (errors.areaCode.type === "max" ||
                errors.areaCode.type === "min") && (
                <span className="text-sm text-red-400">
                  DDD deve ter 2 caracteres.
                </span>
              )}

            {errors.areaCode && errors.areaCode.type === "matches" && (
              <span className="text-sm text-red-400">
                DDD deve conter apenas letras.
              </span>
            )}
          </div>

          <div className="flex flex-auto flex-col">
            <label
              htmlFor="phoneNumber"
              className={`font-semibold ${
                errors.phoneNumber ? "text-red-400" : "text-white"
              } text-black`}
            >
              Celular
            </label>
            <input
              type="text"
              id="phoneNumber"
              className={`rounded-md border-2 p-2 ${
                errors.phoneNumber ? "border-red-400" : "border-gray-400"
              } text-black`}
              placeholder="XXXXXXXXX"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && errors.phoneNumber.type === "required" && (
              <span className="text-sm text-red-400">
                Telefone é obrigatório.
              </span>
            )}

            {errors.phoneNumber &&
              (errors.phoneNumber.type === "max" ||
                errors.phoneNumber.type === "min") && (
                <span className="text-sm text-red-400">
                  Telefone deve ter 9 caracteres.
                </span>
              )}

            {errors.phoneNumber && errors.phoneNumber.type === "matches" && (
              <span className="text-sm text-red-400">
                Telefone deve conter apenas letras.
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex flex-auto flex-col">
            <label
              htmlFor="streetAddress"
              className={`font-semibold ${
                errors.streetAddress ? "text-red-400" : "text-white"
              } text-black`}
            >
              Endereço
            </label>
            <input
              type="text"
              id="streetAddress"
              className={`rounded-md border-2 p-2 ${
                errors.streetAddress ? "border-red-400" : "border-gray-400"
              } text-black`}
              placeholder="Rua. Exemplo, 123"
              {...register("streetAddress")}
            />
            {errors.streetAddress &&
              errors.streetAddress.type === "required" && (
                <span className="text-sm text-red-400">
                  Endereço é obrigatório.
                </span>
              )}

            {errors.streetAddress && errors.streetAddress.type === "max" && (
              <span className="text-sm text-red-400">
                Endereço deve ter no máximo 255 caracteres.
              </span>
            )}

            {errors.streetAddress &&
              errors.streetAddress.type === "matches" && (
                <span className="text-sm text-red-400">
                  Endereço deve conter apenas letras.
                </span>
              )}
          </div>

          <div className="flex w-2/5 flex-col">
            <label
              htmlFor="neighborhood"
              className={`font-semibold ${
                errors.neighborhood ? "text-red-400" : "text-white"
              } text-black`}
            >
              Bairro
            </label>
            <input
              type="text"
              id="neighborhood"
              className={`rounded-md border-2 p-2 ${
                errors.neighborhood ? "border-red-400" : "border-gray-400"
              } text-black`}
              placeholder="Bairro Exemplo"
              {...register("neighborhood")}
            />
            {errors.neighborhood && errors.neighborhood.type === "required" && (
              <span className="text-sm text-red-400">
                Bairro é obrigatório.
              </span>
            )}

            {errors.neighborhood && errors.neighborhood.type === "max" && (
              <span className="text-sm text-red-400">
                Bairro deve ter no máximo 255 caracteres.
              </span>
            )}

            {errors.neighborhood && errors.neighborhood.type === "matches" && (
              <span className="text-sm text-red-400">
                Bairro deve conter apenas letras.
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex flex-auto flex-col">
            <label
              htmlFor="city"
              className={`font-semibold ${
                errors.city ? "text-red-400" : "text-white"
              } text-black`}
            >
              Cidade
            </label>
            <input
              type="text"
              id="city"
              className={`rounded-md border-2 p-2 ${
                errors.city ? "border-red-400" : "border-gray-400"
              } text-black`}
              placeholder="Cidade Exemplo"
              {...register("city")}
            />
            {errors.city && errors.city.type === "required" && (
              <span className="text-sm text-red-400">
                Cidade é obrigatório.
              </span>
            )}

            {errors.city && errors.city.type === "max" && (
              <span className="text-sm text-red-400">
                Cidade deve ter no máximo 255 caracteres.
              </span>
            )}

            {errors.city && errors.city.type === "matches" && (
              <span className="text-sm text-red-400">
                Cidade deve conter apenas letras.
              </span>
            )}
          </div>

          <div className="flex w-1/12 flex-col">
            <label
              htmlFor="state"
              className={`font-semibold ${
                errors.state ? "text-red-400" : "text-white"
              } text-black`}
            >
              Estado
            </label>
            <input
              type="text"
              id="state"
              className={`rounded-md border-2 p-2 ${
                errors.state ? "border-red-400" : "border-gray-400"
              } text-black`}
              {...register("state")}
              placeholder="XX"
            />
            {errors.state && errors.state.type === "required" && (
              <span className="text-sm text-red-400">
                Estado é obrigatório.
              </span>
            )}

            {errors.state &&
              (errors.state.type === "max" || errors.state.type === "min") && (
                <span className="text-sm text-red-400">
                  Estado deve ter 2 caracteres.
                </span>
              )}

            {errors.state && errors.state.type === "matches" && (
              <span className="text-sm text-red-400">
                Estado deve conter apenas letras.
              </span>
            )}
          </div>

          <div className="flex flex-auto flex-col">
            <label
              htmlFor="country"
              className={`font-semibold ${
                errors.country ? "text-red-400" : "text-white"
              } text-black`}
            >
              País
            </label>
            <input
              type="text"
              id="country"
              className={`rounded-md border-2 p-2 ${
                errors.country ? "border-red-400" : "border-gray-400"
              } text-black`}
              {...register("country")}
              placeholder="Brasil"
            />
            {errors.country && errors.country.type === "required" && (
              <span className="text-sm text-red-400">País é obrigatório.</span>
            )}

            {errors.country && errors.country.type === "max" && (
              <span className="text-sm text-red-400">
                País deve ter no máximo 255 caracteres.
              </span>
            )}

            {errors.country && errors.country.type === "matches" && (
              <span className="text-sm text-red-400">
                País deve conter apenas letras.
              </span>
            )}
          </div>

          <div className="flex flex-auto flex-col">
            <label
              htmlFor="postalCode"
              className={`font-semibold ${
                errors.postalCode ? "text-red-400" : "text-white"
              } text-black`}
            >
              CEP
            </label>
            <input
              type="text"
              id="postalCode"
              className={`rounded-md border-2 p-2 ${
                errors.postalCode ? "border-red-400" : "border-gray-400"
              } text-black`}
              {...register("postalCode")}
              placeholder="XXXXXXXX"
            />
            {errors.postalCode && errors.postalCode.type === "required" && (
              <span className="text-sm text-red-400">
                Código postal é obrigatório.
              </span>
            )}

            {errors.postalCode &&
              (errors.postalCode.type === "min" ||
                errors.postalCode.type === "max") && (
                <span className="text-sm text-red-400">
                  Código postal deve ter 8 caracteres.
                </span>
              )}

            {errors.postalCode && errors.postalCode.type === "matches" && (
              <span className="text-sm text-red-400">
                Código postal deve conter apenas letras.
              </span>
            )}
          </div>
        </div>
      </section>

      <button
        type="submit"
        className="my-4 rounded-xl bg-green-400 py-2 font-semibold text-white hover:bg-green-500"
      >
        Enviar
      </button>
      <span className="text-white">
        Já possui uma conta?{" "}
        <button
          onClick={handleSignInClick}
          className="font-semibold text-blue-500 hover:underline"
          type="button"
        >
          Logar-se
        </button>
      </span>
    </form>
  );
};
