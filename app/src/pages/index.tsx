import { useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para a rota "/menu" quando a página carregar
    router.push('/menu');
  }, []);

  return <div>Redirecionando para /menu...</div>;
};

export default IndexPage;