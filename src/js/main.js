document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const body = document.body;
    const themeSwitch = document.getElementById('theme-switch');
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const plantAssistant = document.getElementById('plantAssistant');
    const assistantAvatar = document.querySelector('.assistant-avatar');
    const assistantBubble = document.querySelector('.assistant-bubble');
    const optionButtons = document.querySelectorAll('.option-btn');
    const tipLinks = document.querySelectorAll('.read-more');
    const tipModal = document.getElementById('tip-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Theme Toggle
    themeSwitch.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        
        // Save preference to localStorage
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });
    
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
    
    // Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Gallery functionality
    const galleryData = [
        {
            id: 1,
            category: 'maintenance',
            image: 'https://images.pexels.com/photos/7728082/pexels-photo-7728082.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Manutenção de Plantas Internas',
            description: 'Cuidados especializados para suas plantas de interior'
        },
        {
            id: 2,
            category: 'gardens',
            image: 'https://images.pexels.com/photos/6231674/pexels-photo-6231674.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Limpeza de Jardim Residencial',
            description: 'Transformação completa para seu jardim'
        },
        {
            id: 3,
            category: 'landscaping',
            image: 'https://images.pexels.com/photos/5528995/pexels-photo-5528995.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Projeto de Paisagismo',
            description: 'Design e implementação de espaços verdes'
        },
        {
            id: 4,
            category: 'maintenance',
            image: 'https://images.pexels.com/photos/8797337/pexels-photo-8797337.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Tratamento de Plantas',
            description: 'Cuidado especial para plantas com problemas'
        },
        {
            id: 5,
            category: 'gardens',
            image: 'https://images.pexels.com/photos/5528759/pexels-photo-5528759.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Reforma de Jardim',
            description: 'Revitalização completa de áreas externas'
        },
        {
            id: 6,
            category: 'landscaping',
            image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Jardim Vertical',
            description: 'Soluções criativas para espaços limitados'
        }
    ];
    
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Populate gallery
    function populateGallery(items) {
        galleryGrid.innerHTML = '';
        
        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.category = item.category;
            
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="gallery-item-overlay">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    // Initialize gallery
    populateGallery(galleryData);
    
    // Gallery filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.dataset.filter;
            
            if (filterValue === 'all') {
                populateGallery(galleryData);
            } else {
                const filteredItems = galleryData.filter(item => item.category === filterValue);
                populateGallery(filteredItems);
            }
        });
    });
    
    // Testimonials slider
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    let currentIndex = 0;
    
    // Create dots for testimonials
    function createDots() {
        for (let i = 0; i < testimonialCards.length; i++) {
            const dot = document.createElement('div');
            dot.className = i === 0 ? 'dot active' : 'dot';
            dot.dataset.index = i;
            
            dot.addEventListener('click', function() {
                goToSlide(parseInt(this.dataset.index));
            });
            
            dotsContainer.appendChild(dot);
        }
    }
    
    createDots();
    
    // Show only one testimonial at a time
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Initialize testimonial slider
    showTestimonial(currentIndex);
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        showTestimonial(currentIndex);
    }
    
    // Next slide
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        showTestimonial(currentIndex);
    });
    
    // Previous slide
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentIndex);
    });
    
    // Animate stats counter
    const stats = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            let count = 0;
            const duration = 2000; // 2 seconds
            const interval = Math.floor(duration / target);
            
            const counter = setInterval(() => {
                count++;
                stat.textContent = count;
                
                if (count >= target) {
                    clearInterval(counter);
                }
            }, interval);
        });
    }
    
    // Intersection Observer for stats animation
    if (stats.length > 0) {
        const statsContainer = document.querySelector('.stats-container');
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                animateStats();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsContainer);
    }
    
    // Plant Care Tips Modal
    const tipContentData = {
        watering: {
            title: 'Dicas de Rega',
            content: `
                <h3>Como Regar suas Plantas Corretamente</h3>
                <p>A rega é um dos aspectos mais importantes no cuidado com as plantas. Aqui estão algumas dicas essenciais:</p>
                
                <h4>1. Conheça as necessidades da sua planta</h4>
                <p>Cada espécie tem requisitos específicos de água. Plantas suculentas e cactos precisam de menos água, enquanto plantas tropicais geralmente necessitam de mais umidade.</p>
                
                <h4>2. Verifique a umidade do solo</h4>
                <p>Antes de regar, coloque o dedo cerca de 2-3 cm no solo. Se estiver seco nessa profundidade, é hora de regar. Se ainda estiver úmido, espere mais um pouco.</p>
                
                <h4>3. Qualidade da água</h4>
                <p>Utilize água em temperatura ambiente. Algumas plantas são sensíveis ao cloro, então deixar a água descansar por 24 horas antes de usar pode ser benéfico.</p>
                
                <h4>4. Técnica de rega</h4>
                <p>Regue lentamente até que a água comece a sair pelos furos de drenagem. Isso garante que toda a raiz receba água adequadamente.</p>
                
                <h4>5. Horário ideal</h4>
                <p>O melhor momento para regar é pela manhã, permitindo que as folhas sequem durante o dia, reduzindo o risco de doenças fúngicas.</p>
                
                <h4>6. Sinais de rega excessiva</h4>
                <ul>
                    <li>Folhas amareladas e murchas</li>
                    <li>Odor de mofo no solo</li>
                    <li>Aparecimento de fungos</li>
                    <li>Raízes escuras e moles</li>
                </ul>
                
                <h4>7. Sinais de rega insuficiente</h4>
                <ul>
                    <li>Folhas secas e quebradiças</li>
                    <li>Crescimento lento</li>
                    <li>Solo rachado</li>
                    <li>Queda de folhas</li>
                </ul>
            `
        },
        lighting: {
            title: 'Iluminação Ideal',
            content: `
                <h3>Iluminação Adequada para suas Plantas</h3>
                <p>A luz é essencial para a fotossíntese e desenvolvimento saudável das plantas. Aqui está um guia de iluminação:</p>
                
                <h4>1. Tipos de exposição à luz</h4>
                <ul>
                    <li><strong>Luz direta:</strong> Raios solares atingindo diretamente a planta</li>
                    <li><strong>Luz indireta brilhante:</strong> Próximo a janelas mas sem receber raios solares diretos</li>
                    <li><strong>Luz indireta média:</strong> Ambiente iluminado naturalmente mas distante de janelas</li>
                    <li><strong>Sombra parcial:</strong> Áreas com pouca incidência de luz natural</li>
                </ul>
                
                <h4>2. Necessidades por tipo de planta</h4>
                <p><strong>Luz direta:</strong> Cactos, suculentas, hibiscos e maioria das plantas floríferas</p>
                <p><strong>Luz indireta brilhante:</strong> Monstera, jiboia, palmeiras e maioria das plantas de folhagem</p>
                <p><strong>Luz indireta média:</strong> Samambaias, aglaonemas e plantas de baixa luminosidade</p>
                <p><strong>Sombra parcial:</strong> Zamioculcas, aspidistra e algumas espécies de samambaias</p>
                
                <h4>3. Sinais de excesso de luz</h4>
                <ul>
                    <li>Folhas queimadas ou com manchas claras</li>
                    <li>Folhas desbotadas ou amareladas</li>
                    <li>Ressecamento do solo muito rápido</li>
                </ul>
                
                <h4>4. Sinais de falta de luz</h4>
                <ul>
                    <li>Crescimento esticado em direção à fonte de luz</li>
                    <li>Folhas menores que o normal</li>
                    <li>Perda de variegação em plantas coloridas</li>
                    <li>Redução ou ausência de flores</li>
                </ul>
                
                <h4>5. Dicas para iluminação adequada</h4>
                <p>Rotacione periodicamente suas plantas para garantir crescimento uniforme.</p>
                <p>Use cortinas leves para filtrar luz solar intensa em janelas voltadas para o sul.</p>
                <p>Considere luzes artificiais específicas para plantas em ambientes com pouca luz natural.</p>
            `
        },
        soil: {
            title: 'Solo e Nutrientes',
            content: `
                <h3>Solo e Nutrição para Plantas Saudáveis</h3>
                <p>O solo fornece suporte, água e nutrientes essenciais para suas plantas. Entenda como otimizá-lo:</p>
                
                <h4>1. Componentes de um bom substrato</h4>
                <ul>
                    <li><strong>Terra vegetal:</strong> Base para maioria dos substratos</li>
                    <li><strong>Perlita/Vermiculita:</strong> Melhora a aeração e drenagem</li>
                    <li><strong>Areia:</strong> Aumenta a drenagem, ideal para suculentas</li>
                    <li><strong>Húmus/Composto:</strong> Adiciona nutrientes e melhora estrutura</li>
                    <li><strong>Fibra de coco:</strong> Retém umidade e é sustentável</li>
                </ul>
                
                <h4>2. Misturas específicas por tipo de planta</h4>
                <p><strong>Plantas tropicais:</strong> 60% terra vegetal, 20% húmus, 20% perlita</p>
                <p><strong>Suculentas e cactos:</strong> 40% terra vegetal, 40% areia, 20% perlita</p>
                <p><strong>Samambaias:</strong> 50% terra vegetal, 30% húmus, 20% fibra de coco</p>
                <p><strong>Orquídeas:</strong> 70% casca de pinus, 20% carvão, 10% esfagno</p>
                
                <h4>3. Nutrientes essenciais</h4>
                <ul>
                    <li><strong>Nitrogênio (N):</strong> Crescimento de folhagem e cor verde</li>
                    <li><strong>Fósforo (P):</strong> Desenvolvimento de raízes e flores</li>
                    <li><strong>Potássio (K):</strong> Saúde geral e resistência a doenças</li>
                </ul>
                
                <h4>4. Adubação</h4>
                <p>Fertilize plantas em crescimento a cada 2-4 semanas na primavera e verão.</p>
                <p>Reduza ou suspenda a adubação no outono e inverno, quando o crescimento desacelera.</p>
                <p>Sempre siga as instruções do fabricante do fertilizante para evitar excesso.</p>
                
                <h4>5. pH do solo</h4>
                <p>A maioria das plantas prefere pH entre 6.0 e 7.0 (levemente ácido a neutro).</p>
                <p>Algumas plantas como azaleias e hortênsias preferem solo mais ácido (pH 5.0-6.0).</p>
                
                <h4>6. Quando trocar o solo</h4>
                <p>Geralmente, recomenda-se trocar o substrato anualmente ou quando:</p>
                <ul>
                    <li>O solo não retém mais água adequadamente</li>
                    <li>Há compactação excessiva</li>
                    <li>A planta está com crescimento estagnado</li>
                    <li>No momento da replantagem</li>
                </ul>
            `
        }
    };
    
    tipLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const tipType = this.dataset.tip;
            const tipData = tipContentData[tipType];
            
            if (tipData) {
                const modalBody = document.querySelector('.modal-body');
                modalBody.innerHTML = `<h2>${tipData.title}</h2>${tipData.content}`;
                
                tipModal.classList.add('active');
                body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        tipModal.classList.remove('active');
        body.style.overflow = ''; // Allow scrolling again
    });
    
    // Close modal when clicking outside content
    tipModal.addEventListener('click', function(e) {
        if (e.target === tipModal) {
            tipModal.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    // Plant Assistant
    assistantAvatar.addEventListener('click', function() {
        assistantBubble.classList.toggle('hidden');
    });
    
    // Assistant options
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const option = this.dataset.option;
            
            switch (option) {
                case 'services':
                    document.querySelector('#servicos').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    break;
                case 'tips':
                    document.querySelector('#dicas').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    break;
                case 'contact':
                    document.querySelector('#contato').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    break;
            }
            
            assistantBubble.classList.add('hidden');
        });
    });
    
    // Handle form submissions
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            
            if (name && email && message) {
                // In a real project, you would send this data to a server
                alert('Obrigado por entrar em contato! Responderemos em breve.');
                this.reset();
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // In a real project, you would send this data to a server
                alert('Obrigado por se inscrever em nossa newsletter!');
                this.reset();
            } else {
                alert('Por favor, informe seu email.');
            }
        });
    }
    
    // Scroll effects
    function handleScrollEffects() {
        const scrollPosition = window.scrollY;
        
        // Header background effect
        const header = document.querySelector('header');
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Reveal elements on scroll
        document.querySelectorAll('.reveal-on-scroll').forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Initialize scroll effects
    window.addEventListener('scroll', handleScrollEffects);
    handleScrollEffects(); // Initial call
    
    // Add reveal class to elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal-on-scroll');
    });
}); 