import { HeaderHome } from "../../components/HeaderHome"
import { Link } from "react-router"
import imgSistema from "../../assets/sistema-datacerta.png"
import imgResolve from "../../assets/resolve.png"
import { BsBoxSeam } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TbEyeExclamation } from "react-icons/tb";
import { FiGithub } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export function Home(){
    useEffect(() => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 50
    })
},[])
    return (
      <div className="max-w-screen min-h-screen w-full pl-5 pr-5 pt-5">
        <div className="max-w-screen w-full min-h-260 bg-[linear-gradient(135deg,#0224a5_0%,#0344f8_40%,#4400ff_90%)] bg-no-repeat bg-fixed rounded-2xl">
          <header
            className="flex justify-center pl-4 pr-4"
            data-aos="fade-up"
            data-aos-duration="2300"
          >
            <HeaderHome />
          </header>
          <div
            className="max-w-3xl flex flex-col justify-center items-center m-auto mt-30"
            data-aos="fade-up"
            data-aos-duration="2200"
          >
            <p className="text-gray-400 mb-8">Introdução ao DataCerta</p>
            <h1 className="font-bold text-6xl text-black mb-7 text-center">
              Controle Vencimentos
            </h1>
            <p className="text-blackfont-medium text-center text-lg sm:text-lg">
              Muitas empresas enfrentam dificuldades para acompanhar as datas de
              validade do estoque e só percebem os problemas quando já é tarde
              demais. A DataCerta surge exatamente para tornar esse processo
              simples, automático e muito mais confiável. Com ela, você mantém o
              controle em dia e evita desperdícios, prejuízos e retrabalho.
            </p>
            <Link to={"/signup"}>
              <button
                className="text-lg cursor-pointer bg-black hover:bg-black/80 duration-300 ease-in-out rounded-sm text-white pt-2 pb-2 pl-3 pr-3 mt-10"
                id="app"
              >
                Comece grátis
              </button>
            </Link>
          </div>
        </div>
        <div className="hidden sm:block md:block max-w-screen w-full min-h-120 bg-[#c9c5c5] rounded-2xl linear mt-5">
          <img
            src={imgSistema}
            alt="Imagem do Sistema"
            data-aos="fade-up"
            data-aos-duration="2100"
            className="hidden lg:block max-w-5xl w-full rounded-2xl absolute left-1/2 -translate-x-1/2 top-160"
          />
        </div>
        <div className="max-w-screen w-full min-h-120 bg-[linear-gradient(135deg,#0224a5_0%,#0344f8_40%,#4400ff_90%)] bg-no-repeat bg-fixed rounded-2xl linear mt-5 flex items-center justify-center pb-5">
          <div className="flex flex-col gap-8 p-8" id="about">
            <h2
              className="text-4xl font-bold text-black"
              data-aos="fade-up"
              data-aos-duration="2300"
            >
              O que vou ter acesso <br /> na paltaforma?
            </h2>
            <div className="flex gap-8 flex-wrap">
              <div data-aos="fade-up" data-aos-duration="2300">
                <div className="max-w-sm bg-white rounded-lg p-10 h-70 hover:scale-110 duration-300 ease-in-out">
                  <div className="bg-[#0344f8] w-13 h-13 flex items-center justify-center rounded-lg">
                    <BsBoxSeam className="text-4xl text-white" />
                  </div>
                  <p className="font-bold text-lg mt-5">Cadastro de Produtos</p>
                  <p className="mt-5">
                    Uma seção aonde você pode cadastrar novos produtos com
                    descrição, validade, lote e fornecedor.
                  </p>
                </div>
              </div>
              <div data-aos="fade-up" data-aos-duration="2200">
                <div className="max-w-sm bg-white rounded-lg p-10 h-70 hover:scale-110 duration-300 ease-in-out">
                  <div className="bg-[#0344f8] w-13 h-13 flex items-center justify-center rounded-lg">
                    <TbEyeExclamation className="text-4xl text-white" />
                  </div>
                  <p className="font-bold text-lg mt-5">
                    Próximos do Vencimento
                  </p>
                  <p className="mt-5">
                    Uma seção que você consegue gerenciar produtos que estão
                    próximos do vencimento.
                  </p>
                </div>
              </div>
              <div data-aos="fade-up" data-aos-duration="2100">
                <div className="max-w-sm bg-white rounded-lg p-10 h-70 hover:scale-110 duration-300 ease-in-out">
                  <div className="bg-[#0344f8] w-13 h-13 flex items-center justify-center rounded-lg">
                    <IoIosCloseCircleOutline className="text-4xl text-white" />
                  </div>
                  <p className="font-bold text-lg mt-5">Seção de Vencidos</p>
                  <p className="mt-5">
                    Você também pode visualizar produtos que estão vencidos e
                    prontos para descarte.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-screen w-full min-h-180 bg-[linear-gradient(135deg,#0224a5_0%,#0344f8_40%,#4400ff_90%)] bg-no-repeat bg-fixed rounded-2xl linear mt-5 flex justify-center">
          <div className="mt-14 mb-14 flex gap-15 flex-wrap justify-center pl-8 pr-8">
            <div data-aos="fade-right" data-aos-duration="2300">
              <img
                src={imgResolve}
                alt="Imagem Resolução"
                className="rounded-2xl max-w-lg hidden sm:block"
              />
            </div>
            <div className="max-w-lg">
              <h2
                className="font-bold text-4xl max-w-lg"
                data-aos="fade-left"
                data-aos-duration="1900"
              >
                A solução para seus problemas de vencimentos.
              </h2>
              <p
                className="mt-6 text-[#c9c5c5]"
                data-aos="fade-left"
                data-aos-duration="2000"
              >
                O sistema ideal para gerenciar vencimentos de forma simples e
                segura. Com cadastro ágil, alertas inteligentes e controle
                completo de lotes, fornecedores e validades, você evita perdas e
                mantém tudo organizado. Uma interface intuitiva que transforma o
                controle de estoque em um processo rápido, confiável e
                eficiente.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                <li
                  className="text-white font-bold"
                  data-aos="fade-left"
                  data-aos-duration="2100"
                >
                  ✔ Cadastro ágil
                </li>
                <li
                  className="text-white font-bold"
                  data-aos="fade-left"
                  data-aos-duration="2200"
                >
                  ✔ Detalhes completos
                </li>
                <li
                  className="text-white font-bold"
                  data-aos="fade-left"
                  data-aos-duration="2300"
                >
                  ✔ Validades seguras
                </li>
                <li
                  className="text-white font-bold"
                  data-aos="fade-left"
                  data-aos-duration="2400"
                >
                  ✔ Lotes organizados
                </li>
                <li
                  className="text-white font-bold"
                  data-aos="fade-left"
                  data-aos-duration="2500"
                >
                  ✔ Fornecedores mapeados
                </li>
                <li
                  className="text-white font-bold"
                  data-aos="fade-left"
                  data-aos-duration="2600"
                >
                  ✔ Alertas de proximidade
                </li>
                <li
                  className="text-white font-bold"
                  data-aos="fade-left"
                  data-aos-duration="2700"
                >
                  ✔ Gerenciar vencimentos
                </li>
                <li
                  className="text-white font-bold"
                  data-aos="fade-left"
                  data-aos-duration="2800"
                >
                  ✔ Seção vencidos
                </li>
                <li
                  className="text-white font-bold"
                  data-aos="fade-left"
                  data-aos-duration="2900"
                >
                  ✔ Sidebar dinâmica
                </li>
                <li
                  className="text-white font-bold"
                  data-aos="fade-left"
                  data-aos-duration="3000"
                >
                  ✔ Interface intuitiva
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="max-w-screen w-full min-h-120 bg-black bg-no-repeat bg-fixed rounded-2xl linear mt-5 flex flex-col items-center justify-center relative"
          id="proposal"
        >
          <div data-aos="fade-right" data-aos-duration="2300">
            <div className="flex flex-col items-center">
              <h2 className="text-white text-4xl font-bold mb-3 text-center">
                Sabe qual é o melhor de tudo isso?
              </h2>
              <p className="text-[#c9c5c5] text-center">
                A plataforma é totalmente gratuita, crie sua conta e faça o
                login para utilizar os recursos sem nenhum custo.
              </p>
              <Link to={"/signup"}>
                <button className="text-lg cursor-pointer bg-[#0344f8] hover:bg-[#0344f8a6] duration-300 ease-in-out rounded-sm text-white pt-2 pb-2 pl-3 pr-3 mt-7">
                  Começar grátis
                </button>
              </Link>
            </div>
          </div>
          <div
            className="absolute bottom-5 flex items-center flex-col"
            data-aos="fade-left"
            data-aos-duration="2300"
          >
            <p className="text-white font-bold text-center">
              Desenvolvido por Roger Anacleto • © 2025 Todos os direitos
              reservados.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://github.com/rogeranacleto"
                className="hover:scale-110 duration-300 ease-in-out"
                target="_blank"
              >
                <FiGithub className="text-white text-lg" />
              </a>
              <a
                href="https://www.linkedin.com/in/rogeranacleto/"
                className="hover:scale-110 duration-300 ease-in-out"
                target="_blank"
              >
                <CiLinkedin className="text-white text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}