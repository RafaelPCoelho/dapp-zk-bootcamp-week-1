import { useContract } from "./hooks/useContract";
import { useWallet } from "./hooks/useWallet";
import { WalletClient } from "viem";
import React, { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import ParticlesBackground from "./components/particles/ParticlesBackground";
import "./styles/global.css";

function App() {
  const { account, client, error, connectWallet } = useWallet();
  const { name, symbol, decimals, contractClient } = useContract(client as WalletClient, account);
  const [tab, setTab] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <ParticlesBackground />
      <div className="header">
        <nav className="nav-bar">
          <div className="logo">
            <img src="/ethereum-logo.png" alt="Logo" className="eth-logo" />
          </div>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fas fa-bars"></i>
          </button>
          <div className="nav-links" style={{ display: menuOpen ? 'flex' : undefined }}>
            <a href="#" className="nav-link">Documentação</a>
            <a href="#" className="nav-link">GitHub</a>
            <a href="#" className="nav-link">Comunidade</a>
          </div>
        </nav>
      </div>
      <div className="container">
        <div className="hero-section">
          <div className="hero-logo">
            <img src="/ethereum-logo.png" alt="Logo" style={{ width: '80%', height: '80%' }} />
          </div>
          <div>
            <h1 className="title">O Grande Código</h1>
            <p className="subtitle">Gerencie seus tokens de forma segura e descentralizada</p>
            {null}
          </div>
        </div>
        <div className="features-carousel">
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-shield-alt"></i></div>
            <h3>Seguro</h3>
            <p>Transações protegidas pela blockchain</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-bolt"></i></div>
            <h3>Rápido</h3>
            <p>Transferências instantâneas</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-lock"></i></div>
            <h3>Privado</h3>
            <p>Controle total dos seus ativos</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-chart-line"></i></div>
            <h3>Transparente</h3>
            <p>Histórico completo de transações</p>
          </div>
        </div>
        <div className="main-content">
          {account !== "0x0" && contractClient ? (
            <div className="dashboard-wrapper">
              <div className="status-bar">
                <div className="network-status">
                  <span className="status-dot"></span>
                  Conectado à rede
                </div>
                <div className="wallet-info">
                  <i className="fas fa-wallet"></i>
                  {account.slice(0, 6)}...{account.slice(-4)}
                </div>
              </div>
              <div className="tabs">
                <button className={`tab-btn${tab === 'overview' ? ' active' : ''}`} onClick={() => setTab('overview')}>Visão Geral</button>
                <button className={`tab-btn${tab === 'transactions' ? ' active' : ''}`} onClick={() => setTab('transactions')}>Transações</button>
                <button className={`tab-btn${tab === 'settings' ? ' active' : ''}`} onClick={() => setTab('settings')}>Configurações</button>
              </div>
              <div className="card">
                {tab === 'overview' && (
                  <>
                    <div className="card-header">
                      <h2 className="card-title">Dashboard</h2>
                      <div className="card-badges">
                        <span className="badge">{name}</span>
                        <span className="badge">{symbol}</span>
                      </div>
                    </div>
                    <Dashboard
                      account={account}
                      contract={contractClient}
                      name={name}
                      symbol={symbol}
                      decimals={decimals}
                    />
                  </>
                )}
                {tab === 'transactions' && (
                  <div style={{ color: '#b0c4d4', textAlign: 'center', padding: '2rem 0' }}>
                    <i className="fas fa-history" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
                    <p>Histórico de transações em breve...</p>
                  </div>
                )}
                {tab === 'settings' && (
                  <div style={{ color: '#b0c4d4', textAlign: 'center', padding: '2rem 0' }}>
                    <i className="fas fa-cog" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
                    <p>Configurações em breve...</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="connect-section">
              <h2>Conecte sua carteira</h2>
              <p>Para começar, conecte-se usando MetaMask</p>
              <button className="connect-btn" onClick={connectWallet}>
                <i className="fas fa-wallet"></i> Conectar MetaMask
              </button>
              {error && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  <p>{error}</p>
                </div>
              )}
            </div>
          )}
        </div>
        <footer className="footer">
          <div className="footer-content">
            <p>© 2025 O Grande Código. Todos os direitos reservados.</p>
            <div className="social-links">
              <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link"><i className="fab fa-discord"></i></a>
              <a href="#" className="social-link"><i className="fab fa-github"></i></a>
              <a href="#" className="social-link"><i className="fab fa-telegram"></i></a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
