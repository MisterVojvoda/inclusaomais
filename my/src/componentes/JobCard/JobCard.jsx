import React from 'react';
import './JobCard.scss';

export default function JobCard({ vaga, onCandidatar }) {
  if (!vaga) return null;

  return (
    <div className="job-card">
      <div className="job">
        <span className="badge-modalidade">{vaga.modalidade}</span>
      </div>

      <div className="jobc">
        <h3>{vaga.titulo}</h3>
        <p className="empresa">{vaga.empresa}</p>
        <p className="local"> {vaga.local}</p>

        {vaga.salario && (
          <div className="salario-box">
            <span className="salario-label">Remuneração estimada:</span>
            <span className="salario-valor">{vaga.salario}</span>
          </div>
        )}

        {vaga.descricao && (
          <p className="descricao">{vaga.descricao}</p>
        )}

        <div className="tags">
          <span className="tag">✓ Aceita Idosos 50+</span>
          <span className="tag">✓ Compatível com Leitor de Tela</span>
          <span className="tag">✓ Horário Flexível</span>
        </div>
      </div>

      <button 
        className="btn-candidatar"
        onClick={onCandidatar}
      >
        Candidatar em 1 Clique
      </button>
    </div>
  );
}