import { useContract } from "./hooks/useContract";
import { useWallet } from "./hooks/useWallet";
import { WalletClient } from "viem";
import React from "react";
import { Dashboard } from "./components/Dashboard";
import ParticlesBackground from "./components/particles/ParticlesBackground";
import "./styles/global.css";

function App() {
  const { account, client, error, connectWallet } = useWallet();
  const { name, symbol, decimals, contractClient } = useContract(client as WalletClient, account);

  return (
    <>
      <ParticlesBackground />
      <div className="header">
        <nav className="nav-bar">
          <div className="logo">
            <img src="/ethereum-logo.png" alt="Logo" className="eth-logo" />
          </div>
          <div className="nav-links">
            <a href="#" className="nav-link">Docs</a>
            <a href="#" className="nav-link">Github</a>
          </div>
        </nav>
      </div>
      <div className="container">
        <div className="hero-section">
          <h1 className="title">O Grande Código</h1>
          <p className="subtitle">Gerencie seus tokens de forma segura e descentralizada</p>
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
                  <i className="fas fa-user-circle"></i>
                  {account.slice(0, 6)}...{account.slice(-4)}
                </div>
              </div>
              
              <div className="card glass-effect">
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
              </div>
            </div>
          ) : (
            <div className="welcome-section">
              <div className="features-grid">
                <div className="feature-card">
                  <i className="fas fa-shield-alt"></i>
                  <h3>Seguro</h3>
                  <p>Transações protegidas pela blockchain</p>
                </div>
                <div className="feature-card">
                  <i className="fas fa-bolt"></i>
                  <h3>Rápido</h3>
                  <p>Transferências instantâneas</p>
                </div>
                <div className="feature-card">
                  <i className="fas fa-lock"></i>
                  <h3>Privado</h3>
                  <p>Controle total dos seus ativos</p>
                </div>
              </div>
              
              <div className="connect-section glass-effect">
                <h2>Conecte sua carteira</h2>
                <p>Para começar, conecte-se usando MetaMask</p>
                <button className="connect-btn pulse" onClick={connectWallet}>
                  <i className="fas fa-wallet"></i> Conectar MetaMask
                </button>
                {error && (
                  <div className="error-message">
                    <i className="fas fa-exclamation-circle"></i>
                    <p>{error}</p>
                  </div>
                )}
              </div>
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
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
