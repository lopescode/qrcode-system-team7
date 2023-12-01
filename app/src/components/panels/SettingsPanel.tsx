import { HttpRequestHelper } from "@/helpers/HTTPRequestHelper";
import { User } from "@/types/Api";
import { IconPencil } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import router from "next/router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export const SettingsPanel = () => {
  const { data: session } = useSession();

  const accessToken = useMemo(() => {
    return session?.user.access_token;
  }, [session]);

  const [refreshData, setRefreshData] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    if (!session?.user.id) {
      router.push("/?panel=menu");
      return;
    }

    const fetchUser = async () => {
      const response = await HttpRequestHelper.get(
        `/user/${session?.user.id}`,
        accessToken
      );

      if (!response || !response.result) {
        toast.error(response?.message ?? "Houve um erro inesperado");
        return;
      }

      setCurrentUser(response.result[response.result.length - 1]);
    };

    fetchUser();
  }, [session?.user.id, accessToken, refreshData]);

  return (
    <div className="flex flex-col gap-10 p-6">
      <span
        className="
      flex items-center justify-center text-4xl font-medium"
      >
        Configurações
      </span>
      <hr />
      <div className="flex flex-wrap gap-6 pb-20">
        {currentUser && (
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-bold text-gray-200">
                Informações gerais
              </h1>
              <div className="flex gap-2">
                <span>
                  {currentUser.firstName} {currentUser.lastName}
                </span>
                <IconPencil className="cursor-pointer" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-bold text-gray-200">Telefone</h1>
              {currentUser.phones.map((phone) => (
                <div className="flex gap-2" key={phone.id}>
                  <span>
                    +{phone.countryCode} ({phone.areaCode}) {phone.phoneNumber}
                  </span>
                  <span>
                    {phone.isDefault && (
                      <span className="text-green-500">Padrão</span>
                    )}
                  </span>
                  <IconPencil className="cursor-pointer" />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-bold text-gray-200">Endereço</h1>
              {currentUser.addresses.map((address) => (
                <div className="flex gap-2" key={address.id}>
                  <span>
                    {address.streetAddress}, {address.streetNumber} -{" "}
                    {address.city} - {address.state}
                  </span>
                  <span>
                    {address.isDefault && (
                      <span className="text-green-500">Padrão</span>
                    )}
                  </span>
                  <IconPencil className="cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
