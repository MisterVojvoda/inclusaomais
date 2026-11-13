import React from 'react';
import './SeusDireiros.scss';
import { Scale } from 'lucide-react';

export default function SeusDireitos() {
  return (
    <section className="direitoss">
      <div className="direitosc">
        <div className="direitosh">
          <div className="titulo">
            <Scale size={28} />
            <h2>Seus Direitos e Apoio Social</h2>
          </div>
          <p>Informações claras sobre leis, benefícios e assistência</p>
        </div>

        <div className="direitosg">
          <div className="direitoc">
            <h3>Lei de Cotas para PCD (Lei nº 8.213/91)</h3>
            <p>Empresas com 100 ou mais empregados são obrigadas por lei a preencher de 2% a 9% dos seus cargos com beneficiários reabilitados ou pessoas com deficiência.</p>
          </div>

          <div className="direito-card">
            <h3>Estatuto da Pessoa Idosa</h3>
            <p>É proibida a discriminação e a fixação de limite máximo de idade na contratação, exceto nos casos em que a natureza do cargo exigir. Pessoas com 60+ têm prioridade de capacitação.</p>
          </div>

          <div className="direito-card">
            <h3>Acúmulo de BPC e Trabalho</h3>
            <p>A pessoa com deficiência contratada como aprendiz pode receber o BPC junto com o salário. Em contratações formais regulares, o BPC fica suspenso e pode retornar sem burocracia se o emprego terminar.</p>
          </div>

          <div className="direito-card">
            <h3>Canais de Apoio Gratuito</h3>
            <p>Disque 100: Violações de direitos humanos (idosos e PCDs). CRAS / CREAS: Procure a assistência social de seu município para cadastramento único (CadÚnico).</p>
          </div>
        </div>
      </div>
    </section>
  );
}