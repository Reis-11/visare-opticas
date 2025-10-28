// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // LÓGICA DO MENU MOBILE (Otimização: Cache de Seletores)
    // =========================================================
    // Armazena referências para evitar múltiplas buscas no DOM.
    const menuBtn = document.getElementById('menu-mobile-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuBtn ? menuBtn.querySelector('i') : null;

    if (menuBtn && navLinks && menuIcon) {
        
        menuBtn.addEventListener('click', () => {
            // Alterna a classe 'active'
            navLinks.classList.toggle('active');

            // Lógica de MUDAR ícone
            if (navLinks.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });

        // Fecha o menu ao clicar em qualquer link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });
    }


    // =========================================================
    // LÓGICA DO CARROSSEL DE FOTOS DA LOJA (LOCALIZAÇÃO)
    // - Avança 1 slide a cada 3 segundos
    // =========================================================
    let slideIndex = 1; // Começa no slide 1
    let slideTimer;     // Variável para o temporizador automático

    // Cache de seletores
    const slideshowWrapper = document.querySelector('.localizacao-slideshow');
    const slides = document.querySelectorAll('.localizacao-slideshow .slide');
    const totalSlides = slides.length;

    if (slideshowWrapper && slides.length > 0) {
        
        // Função principal que calcula o deslocamento horizontal do slide
        window.showSlides = (n) => {
            clearTimeout(slideTimer); // Limpa o timer ao mudar manual ou automaticamente
            
            // Lógica de loop (se passar do final, volta para o início; se voltar demais, vai para o final)
            if (n > totalSlides) {
                slideIndex = 1;
            }    
            if (n < 1) {
                slideIndex = totalSlides;
            }
            
            // Calcula o quanto o container de slides deve se mover
            // Cada slide tem 100% de largura, então move (index - 1) * 100%
            const translateValue = -(slideIndex - 1) * 100; 
            
            // Aplica a transformação CSS para mover os slides
            document.querySelector('.slides').style.transform = `translateX(${translateValue}%)`;
            
            // Reinicia o avanço automático
            autoSlides();
        }
        
        // Função para avançar ou retroceder manualmente (chamada por botões, se existirem)
        window.plusSlides = (n) => {
            window.showSlides(slideIndex += n);
        }

        // Função para o avanço automático
        function autoSlides() {
            clearTimeout(slideTimer); 

            slideTimer = setTimeout(function() {
                // Avança para o próximo slide
                window.showSlides(slideIndex + 1); 
            }, 3000); // 3 segundos
        }
        
        // Inicializa o carrossel
        window.showSlides(slideIndex); 
        
        // LÓGICA DE PAUSA NO MOUSEOVER (Melhora a UX)
        slideshowWrapper.addEventListener('mouseover', () => {
            clearTimeout(slideTimer); // Pausa
        });

        slideshowWrapper.addEventListener('mouseout', () => {
            autoSlides(); // Reinicia
        });
        
    }
    
    // =========================================================
    // LÓGICA DO CARROSSEL DE FEEDBACKS (DESATIVADA)
    // ESTA SEÇÃO FOI COMENTADA PORQUE O WIDGET DA ELFSIGHT CUIDARÁ 
    // AGORA DOS FEEDBACKS REAIS, INCLUINDO SEU PRÓPRIO CARROSSEL E LÓGICA.
    // =========================================================
    /*
    let feedbackIndex = 0; // Começa em 0 (posição inicial)
    let feedbackTimer; // Variável para o temporizador automático

    // Cache de seletores
    const feedbackSlideshow = document.querySelector('.feedbacks-slideshow');
    const feedbackContainer = document.querySelector('.feedbacks-grid');

    if (feedbackSlideshow && feedbackContainer) {
        const feedbackItems = feedbackContainer.children;
        const totalFeedbacks = feedbackItems.length;
        
        // Determina quantos itens são visíveis baseado na largura da tela
        function getItemsPerView() {
            // Se a largura for menor ou igual a 992px, exibe 1 item por vez (Mobile/Tablet)
            if (window.innerWidth <= 992) {
                return 1;
            }
            return 4; // Desktop (4 itens)
        }
        
        // Função principal que calcula e aplica a translação
        function showFeedback(n) {
            clearTimeout(feedbackTimer);

            // Ajusta o índice para manter dentro dos limites visíveis
            const itemsPerView = getItemsPerView();
            const maxIndex = totalFeedbacks - itemsPerView;

            if (n > maxIndex) {
                feedbackIndex = 0; // Volta ao início
            } else if (n < 0) {
                feedbackIndex = maxIndex; // Volta ao final
            } else {
                feedbackIndex = n;
            }

            // A porcentagem que cada card deve mover
            // Ex: 100% / 4 itens visíveis = 25% por avanço
            const cardMovePercentage = 100 / itemsPerView;

            // Aplica a transformação CSS para mover os cards
            feedbackContainer.style.transform = `translateX(-${feedbackIndex * cardMovePercentage}%)`;
            
            // Reinicia o avanço automático
            autoFeedbackSlides();
        }

        // Função para o avanço automático dos feedbacks
        function autoFeedbackSlides() {
            clearTimeout(feedbackTimer); 

            feedbackTimer = setTimeout(function() {
                // Avança 1 card por vez (feedbackIndex + 1)
                showFeedback(feedbackIndex + 1); 
                // Chama a função novamente para repetição, mas showFeedback já cuida disso
            }, 5000); // 5 segundos
        }
        
        // Inicializa
        showFeedback(feedbackIndex); 
        
        // Inicia o carrossel automático apenas se houver mais cards do que o visível
        if (totalFeedbacks > getItemsPerView()) {
            autoFeedbackSlides();
        }
        
        // Recalcula e reseta o automático no redimensionamento (para mudar de mobile para desktop)
        window.addEventListener('resize', () => {
            clearTimeout(feedbackTimer);
            showFeedback(0); // Volta para o primeiro item ao redimensionar
            if (totalFeedbacks > getItemsPerView()) {
                 autoFeedbackSlides();
            }
        });

        
        // LÓGICA DE PAUSA NO MOUSEOVER (Melhora a UX)
        feedbackSlideshow.addEventListener('mouseover', () => {
            clearTimeout(feedbackTimer); // Pausa
        });

        feedbackSlideshow.addEventListener('mouseout', () => {
            if (totalFeedbacks > getItemsPerView()) {
                autoFeedbackSlides(); // Reinicia
            }
        });

    }
    */ // Fim do bloco de comentários do carrossel de Feedbacks

    
});