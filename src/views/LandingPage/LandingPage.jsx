import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
   // Imagen de productos/estilo de tienda moderna con tonos oscuros para mantener la armonía
   const heroImg = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop";

   return (
      <main className={styles.landingContainer}>

         {/* Botón superior derecho para ir al Home */}
         <header className={styles.topHeader}>
            <Link to="/home" className={styles.recetarioBtn}>
               CATÁLOGO
            </Link>
         </header>
         
         {/* Fondo sutil para un toque más limpio */}
         <div className={styles.ambientGlow}></div>

         <article className={styles.heroCard}>
            {/* --- HEADER CON IMAGEN DE PRODUCTOS --- */}
            <header className={styles.header}>
               <div className={styles.imageWrapper}>
                  <img src={heroImg} alt="Productos destacados" className={styles.heroImg} />
                  <div className={styles.imageOverlay}></div>
               </div>

               <div className={styles.titleGroup}>
                  <h1 className={styles.appName}>CATÁLOGO EXCLUSIVO</h1>
                  <p className={styles.subtitle}>PRODUCTOS DE ALTA GAMA</p>
                  <div className={styles.statusIndicator}>
                     <span className={styles.statusDot}></span>
                     STOCK ACTUALIZADO // 2026
                  </div>
               </div>
            </header>

            {/* --- CONTENIDO DE LA LANDING --- */}
            <div className={styles.content}>
               <section className={styles.section}>
                  <h3 className={styles.sectionTitle}>[ LA EXPERIENCIA ]</h3>
                  <p className={styles.introText}>
                     Una selección cuidada de productos premium para clientes exigentes.
                     Diseñado con un enfoque moderno y elegante, respaldado por la calidad de <span className={styles.brand}>WorderMark</span>.
                  </p>
               </section>
            </div>

            {/* --- FOOTER ELEGANTE --- */}
            <footer className={styles.footer}>
               <div className={styles.authorTag}>DEV: DAVID HERNÁNDEZ</div>
               <div className={styles.versionTag}>V1.0 // DARK_ELEGANCE</div>
            </footer>

            {/* Decoración sutil de esquina */}
            <div className={styles.cornerDecor}></div>
         </article>
      </main>
   );
}

export default LandingPage;