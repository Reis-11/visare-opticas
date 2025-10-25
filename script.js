// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // LÓGICA DO MENU MOBILE (Sem Smooth Scroll)
    // =========================================================
    const menuBtn = document.getElementById('menu-mobile-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuBtn ? menuBtn.querySelector('i') : null; 

    if (menuBtn && navLinks && menuIcon) {
        
        menuBtn.addEventListener('click', () => {
            // 1. Alterna a classe 'active' para acionar a animação no CSS
            navLinks.classList.toggle('active');

            // 2. Lógica para MUDAR o ícone de Hambúrguer para X
            if (navLinks.classList.contains('active')) {
                // Se o menu está ABERTO, muda para 'X' (fa-times)
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                // Se o menu está FECHADO, volta para 'Hambúrguer' (fa-bars)
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });

        // 3. Fecha o menu ao clicar em qualquer link (para navegação)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                
                // Garante que o ícone volte para 'Hambúrguer' ao fechar
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    // =========================================================
    // LÓGICA DO CARROSSEL DE FOTOS (SLIDESHOW - MODO SLIDE)
    // =========================================================
    let slideIndex = 1;
    let slideTimer;

    // Seleciona o container flexível que será transladado
    const slidesContainer = document.querySelector('.slideshow-container .slides');
    // Seleciona o wrapper para monitorar o mouse
    const slideshowWrapper = document.querySelector('.slideshow-wrapper');


    // Função para avançar/voltar slides
    function plusSlides(n) {
        // 1. Limpa o temporizador automático quando o usuário clica
        clearTimeout(slideTimer); 
        
        // 2. Exibe o novo slide e reinicia o loop automático
        showSlides(slideIndex += n);
        autoSlides(); 
    }

    // Função principal para exibir o slide
    function showSlides(n) {
        let slides = document.getElementsByClassName("mySlides");
        
        if (slides.length === 0 || !slidesContainer) return; // Sai se não houver slides ou container
        
        // Lógica para loop
        if (n > slides.length) {
            slideIndex = 1
        } else if (n < 1) { 
            // Volta para o último (Se for tentar voltar)
            slideIndex = slides.length 
        }
        
        // Calcula a distância de translação 
        let translateValue = (slideIndex - 1) * -100; 
        
        // Aplica a translação (o efeito de arrasto)
        slidesContainer.style.transform = `translateX(${translateValue}%)`;
        
    }

    // Função para avançar automaticamente
    function autoSlides() {
        clearTimeout(slideTimer); // Limpa o temporizador anterior
        
        // Define o novo temporizador
        slideTimer = setTimeout(function() {
            // Incrementa o slide e reseta se estiver no último
            if (slideIndex >= slidesContainer.children.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }
            showSlides(slideIndex);
            // Chama a si mesma para continuar o loop
            autoSlides(); 
        }, 5000); // Troca a cada 5 segundos (5000 milissegundos)
    }

    // Inicia o slideshow quando a página carrega
    showSlides(slideIndex);
    autoSlides();

    // A função plusSlides PRECISA ser global para ser chamada pelo HTML (onclick)
    window.plusSlides = plusSlides;

    // LÓGICA DE PAUSA NO MOUSEOVER
    if (slideshowWrapper) {
        // Pausa ao passar o mouse (mouseover)
        slideshowWrapper.addEventListener('mouseover', () => {
            clearTimeout(slideTimer); // Para a contagem do temporizador
        });
        
        // Reinicia ao tirar o mouse (mouseout)
        slideshowWrapper.addEventListener('mouseout', () => {
            autoSlides(); // Reinicia o avanço automático
        });
    }

    // NOTE: O CÓDIGO DO SMOOTH SCROLL FOI REMOVIDO.

});