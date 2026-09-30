
    const track = document.querySelector(".atuacao-track");
    const cards = document.querySelectorAll(".atuacao-card");

    const prevButton = document.querySelector(".carrossel-prev");
    const nextButton = document.querySelector(".carrossel-next");

    const dotsContainer = document.querySelector(".carrossel-dots");

    let currentIndex = 0;


    function getCardsPerView() {

        if (window.innerWidth <= 576) {
            return 1;
        }

        if (window.innerWidth <= 991) {
            return 2;
        }

        return 4;
    }


    function getMaxIndex() {

        const cardsPerView = getCardsPerView();

        return Math.max(
            0,
            cards.length - cardsPerView
        );
    }


    function updatecarrossel() {

        const cardsPerView = getCardsPerView();

        const gap = 20;

        const cardWidth =
            cards[0].offsetWidth + gap;

        track.style.transform =
            `translateX(-${currentIndex * cardWidth}px)`;


        /*
         * Atualiza os botões
         */

        prevButton.disabled =
            currentIndex === 0;

        nextButton.disabled =
            currentIndex >= getMaxIndex();


        /*
         * Atualiza os indicadores
         */

        updateDots();
    }


    function createDots() {

        dotsContainer.innerHTML = "";

        const maxIndex = getMaxIndex();

        for (
            let i = 0;
            i <= maxIndex;
            i++
        ) {

            const dot =
                document.createElement("button");

            dot.classList.add("carrossel-dot");

            dot.setAttribute(
                "aria-label",
                `Ir para posição ${i + 1}`
            );

            dot.addEventListener(
                "click",
                () => {

                    currentIndex = i;

                    updatecarrossel();

                }
            );

            dotsContainer.appendChild(dot);
        }

        updateDots();
    }


    function updateDots() {

        const dots =
            document.querySelectorAll(
                ".carrossel-dot"
            );

        dots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

            }
        );
    }


    nextButton.addEventListener(
        "click",
        () => {

            if (
                currentIndex <
                getMaxIndex()
            ) {

                currentIndex++;

                updatecarrossel();
            }

        }
    );


    prevButton.addEventListener(
        "click",
        () => {

            if (currentIndex > 0) {

                currentIndex--;

                updatecarrossel();
            }

        }
    );


    window.addEventListener(
        "resize",
        () => {

            const maxIndex =
                getMaxIndex();

            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }

            createDots();
            updatecarrossel();

        }
    );

    createDots();
    updatecarrossel();



    const contatoForm =
        document.getElementById("contatoForm");

    const formStatus =
        document.getElementById("formStatus");


    contatoForm.addEventListener(
        "submit",
        function (event) {

            /*
             * Impede o navegador de enviar
             * o formulário para outra página.
             */

            event.preventDefault();


            /*
             * Verifica se todos os campos
             * obrigatórios estão preenchidos.
             */

            if (!contatoForm.checkValidity()) {

                contatoForm.reportValidity();

                return;
            }


            /*
             * Pega o nome digitado pelo usuário.
             */

            const nome =
                document.getElementById("nome").value;


            /*
             * Mostra mensagem de sucesso.
             */

            formStatus.textContent =
                `Obrigado, ${nome}! Sua solicitação foi registrada com sucesso para esta demonstração.`;

            formStatus.classList.add("success");


            /*
             * Volta o formulário para o
             * estado inicial.
             */

            contatoForm.reset();


            /*
             * Faz a mensagem desaparecer
             * depois de alguns segundos.
             */

            setTimeout(
                function () {

                    formStatus.classList.remove("success");

                    formStatus.textContent = "";

                },
                6000
            );

        }
    );


    const voltarTopo =
        document.getElementById("voltarTopo");


    voltarTopo.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );
