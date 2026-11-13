import React, { useState, useEffect } from 'react';
import Header from '../../componentes/header/header';
import JobCard from '../../componentes/JobCard/JobCard';
import CadastroCandidatura from '../../componentes/Cadastro/CadastroCandidatura';
import SeusDireitos from '../../componentes/SeusDireitos/SeusDireitos';
import Footer from '../../componentes/Footer/Footer';
import { UserCheck, Accessibility, Eye, Ear, Brain, Grid, Search } from 'lucide-react';
import './Home.scss';

const CATEGORIAS = [
  { id: 'todas', label: 'Todas as Vagas', icon: Grid },
  { id: 'idosos', label: 'Idosos (50+)', icon: UserCheck },
  { id: 'pcd_fisica', label: 'PCD Física', icon: Accessibility },
  { id: 'pcd_visual', label: 'PCD Visual', icon: Eye },
  { id: 'pcd_auditiva', label: 'PCD Auditiva', icon: Ear },
  { id: 'neurodivergente', label: 'Neurodivergente', icon: Brain },
];

export default function Home() {
  const [vagas, setVagas] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('todas');
  const [termoPesquisa, setTermoPesquisa] = useState(''); 
  const [carregando, setCarregando] = useState(true);
  const [vagaSelecionada, setVagaSelecionada] = useState(null);

  useEffect(() => {
    const buscarVagas = async () => {
      try {
        const response = await fetch('http://localhost:3000/vagas');
        const data = await response.json();
        setVagas(data);
      } catch (error) {
        console.error('Erro ao buscar vagas da API:', error);
      } finally {
        setCarregando(false);
      }
    };

    buscarVagas();
  }, []);

  const vagasFiltradas = vagas.filter(vaga => {

    const atendeCategoria = categoriaAtiva === 'todas'
      ? true
      : Array.isArray(vaga.categorias)
        ? vaga.categorias.includes(categoriaAtiva)
        : vaga.categoria === categoriaAtiva || vaga.tipoDeficiencia === categoriaAtiva;

   
    const localVaga = (vaga.local || '').toLowerCase();
    const tituloVaga = (vaga.titulo || '').toLowerCase();
    const pesquisa = termoPesquisa.toLowerCase();

    const atendePesquisa = localVaga.includes(pesquisa) || tituloVaga.includes(pesquisa);

    return atendeCategoria && atendePesquisa;
  });

  return (
    <div className="home-container">
      <Header />
      
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-badge">Plataforma Gratuita e Acessível</div>
          <h1>Oportunidades de trabalho e apoio sob medida para você</h1>
          <p>Ajudamos idosos (50+) e pessoas com todos os tipos de deficiência (PCD) a encontrarem vagas de emprego respeitosas, com processo simplificado.</p>
        </section>

        
        <section className="busca-regiao-section">
          <div className="busca-box">
            <Search size={20} className="search-icon" />
            <input 
              type="text"
              placeholder="Digite a sua região ou cidade (ex: São Paulo, Rio de Janeiro, PR...)"
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
            />
            {termoPesquisa && (
              <button className="btn-limpar" onClick={() => setTermoPesquisa('')}>
                Limpar
              </button>
            )}
          </div>
        </section>

        {}
        <section className="categorias-section">
          <div className="categorias-titulo">
            <h3>Selecione o seu perfil para ver as vagas</h3>
            <p>Clique em uma das opções abaixo para filtrar os empregos recomendados para você:</p>
          </div>

          <div className="categorias-grid">
            {CATEGORIAS.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <button
                  key={cat.id}
                  className={`categoria-card ${categoriaAtiva === cat.id ? 'ativa' : ''}`}
                  onClick={() => setCategoriaAtiva(cat.id)}
                >
                  <IconComponent />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="vagas-section">
          <div className="vagas-header-title">
            <h2>Vagas Acessíveis Abertas</h2>
            <span className="contador-vagas">Mostrando {vagasFiltradas.length} vaga(s)</span>
          </div>
          
          {carregando ? (
            <p className="nenhuma-vaga">Carregando vagas da API...</p>
          ) : (
            <div className="vagas-grid">
              {vagasFiltradas.length > 0 ? (
                vagasFiltradas.map((vaga) => (
                  <JobCard 
                    key={vaga.id || vaga._id} 
                    vaga={vaga} 
                    onCandidatar={() => setVagaSelecionada(vaga)} 
                  />
                ))
              ) : (
                <p className="nenhuma-vaga">Nenhuma vaga encontrada para a pesquisa selecionada no momento.</p>
              )}
            </div>
          )}
        </section>

        <SeusDireitos />
      </main>

      <Footer />

      {vagaSelecionada && (
        <CadastroCandidatura 
          vaga={vagaSelecionada} 
          onClose={() => setVagaSelecionada(null)} 
        />
      )}
    </div>
  );
}