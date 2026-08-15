document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           OPENING
        ================================================= */

        const openingScreen =
            document.getElementById(
                "openingScreen"
            );

        const openButton =
            document.getElementById(
                "openButton"
            );

        const mainExperience =
            document.getElementById(
                "mainExperience"
            );

        const song1 =
            document.getElementById(
                "song1"
            );


        openButton.addEventListener(
            "click",
            function () {

                song1.currentTime = 0;

                song1.play().catch(
                    function (error) {

                        console.log(
                            "song1 error:",
                            error
                        );

                    }
                );


                openingScreen.classList.add(
                    "hide"
                );

                mainExperience.classList.add(
                    "show"
                );

                startSlideshow();

            }
        );



        /* =================================================
           SLIDESHOW
        ================================================= */

        const slides =
            Array.from(
                document.querySelectorAll(
                    ".slide"
                )
            );

        const nextButton =
            document.getElementById(
                "nextButton"
            );

        const prevButton =
            document.getElementById(
                "prevButton"
            );

        const continueButton =
            document.getElementById(
                "continueButton"
            );

        const progressFill =
            document.getElementById(
                "progressFill"
            );

        const slideHint =
            document.getElementById(
                "slideHint"
            );


        let currentSlide = 0;

        let slideTimer = null;


        const slideMessages = [

            "The first chapter begins.",

            "Oops. I broke it.",

            "Now you have been willow wished."

        ];


        function showSlide(index) {

            slides.forEach(
                function (slide) {

                    slide.classList.remove(
                        "active"
                    );

                }
            );


            slides[index].classList.add(
                "active"
            );


            currentSlide = index;


            progressFill.style.width =
                (
                    (
                        index + 1
                    )
                    /
                    slides.length
                    *
                    100
                )
                + "%";


            slideHint.textContent =
                slideMessages[index];

        }


        function nextSlide() {

            if (
                currentSlide <
                slides.length - 1
            ) {

                showSlide(
                    currentSlide + 1
                );

            }

        }


        function previousSlide() {

            if (
                currentSlide > 0
            ) {

                showSlide(
                    currentSlide - 1
                );

            }

        }


        function startSlideshow() {

            if (slideTimer) {

                clearInterval(
                    slideTimer
                );

            }


            slideTimer =
                setInterval(
                    function () {

                        if (
                            currentSlide <
                            slides.length - 1
                        ) {

                            nextSlide();

                        }
                        else {

                            clearInterval(
                                slideTimer
                            );

                            slideTimer = null;

                        }

                    },
                    2500
                );

        }


        nextButton.addEventListener(
            "click",
            nextSlide
        );

        prevButton.addEventListener(
            "click",
            previousSlide
        );


        continueButton.addEventListener(
            "click",
            function () {

                song1.pause();

                song1.currentTime = 0;


                if (slideTimer) {

                    clearInterval(
                        slideTimer
                    );

                    slideTimer = null;

                }


                document
                    .getElementById(
                        "lyricsSection"
                    )
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );


        showSlide(0);



        /* =================================================
           LYRIC SONGS
        ================================================= */

        const lyricCards =
            document.querySelectorAll(
                ".lyric-card"
            );


        let currentLyricAudio = null;


        function stopLyricSong() {

            if (
                currentLyricAudio
            ) {

                currentLyricAudio.pause();

                currentLyricAudio.currentTime = 0;

            }


            lyricCards.forEach(
                function (card) {

                    card.classList.remove(
                        "playing"
                    );

                }
            );


            currentLyricAudio = null;

        }


        lyricCards.forEach(
            function (card) {

                card.addEventListener(
                    "click",
                    function () {


                        const songId =
                            card.dataset.song;


                        const audio =
                            document.getElementById(
                                songId
                            );


                        if (!audio) {

                            console.log(
                                "Missing audio:",
                                songId
                            );

                            return;

                        }


                        if (
                            currentLyricAudio === audio
                            &&
                            !audio.paused
                        ) {

                            audio.pause();

                            card.classList.remove(
                                "playing"
                            );

                            currentLyricAudio = null;

                            return;

                        }


                        stopLyricSong();


                        currentLyricAudio = audio;


                        audio.currentTime = 0;


                        audio.play().then(
                            function () {

                                card.classList.add(
                                    "playing"
                                );

                            }
                        ).catch(
                            function (error) {

                                console.log(
                                    "Lyric audio:",
                                    error
                                );

                            }
                        );


                        audio.onended =
                            function () {

                                card.classList.remove(
                                    "playing"
                                );

                                currentLyricAudio = null;

                            };

                    }
                );

            }
        );



        /* =================================================
           LETTER
        ================================================= */

        const birthdayEnvelope =
            document.getElementById(
                "birthdayEnvelope"
            );

        const birthdayEnvelopeWrap =
            document.getElementById(
                "birthdayEnvelopeWrap"
            );

        const mailOpening =
            document.getElementById(
                "mailOpening"
            );

        const pullLetterButton =
            document.getElementById(
                "pullLetterButton"
            );

        const letterFullscreen =
            document.getElementById(
                "letterFullscreen"
            );

        const closeLetter =
            document.getElementById(
                "closeLetter"
            );

        const birthdayNextButton =
            document.getElementById(
                "birthdayNextButton"
            );


        let letterOpened = false;


        pullLetterButton.addEventListener(
            "click",
            function () {


                if (letterOpened) {
                    return;
                }


                letterOpened = true;


                stopLyricSong();


                mailOpening.classList.add(
                    "hide"
                );


                birthdayEnvelope.classList.add(
                    "open"
                );


                setTimeout(
                    function () {

                        birthdayEnvelopeWrap.style.transform =
                            "translateY(-40px) scale(.92)";

                    },
                    300
                );


                setTimeout(
                    function () {

                        letterFullscreen.classList.add(
                            "show"
                        );

                    },
                    1200
                );

            }
        );


        closeLetter.addEventListener(
            "click",
            function () {

                letterFullscreen.classList.remove(
                    "show"
                );

            }
        );



        /* =================================================
           CATS VIDEO + BIRTHDAY SONG
        ================================================= */

        const catsVideo =
            document.getElementById(
                "catsVideo"
            );

        const birthdaySong =
            document.getElementById(
                "birthdaySong"
            );


        catsVideo.muted = true;

        catsVideo.volume = 0;


        birthdaySong.volume = 1;

        birthdaySong.loop = true;



        birthdayNextButton.addEventListener(
            "click",
            function () {

                letterFullscreen.classList.remove(
                    "show"
                );


                setTimeout(
                    function () {


                        document
                            .getElementById(
                                "catsVideoChapter"
                            )
                            .scrollIntoView({
                                behavior: "smooth"
                            });


                        setTimeout(
                            function () {


                                catsVideo.muted = true;

                                catsVideo.volume = 0;


                                catsVideo.currentTime = 0;


                                catsVideo.play().catch(
                                    function (error) {

                                        console.log(
                                            "Video error:",
                                            error
                                        );

                                    }
                                );


                            },
                            700
                        );


                    },
                    400
                );

            }
        );



        /*
           Birthday song starts when video starts.

           It does NOT restart when moving
           between cat pages.
        */

        catsVideo.addEventListener(
            "play",
            function () {


                if (
                    birthdaySong.paused
                ) {

                    birthdaySong.play().catch(
                        function (error) {

                            console.log(
                                "Birthday song:",
                                error
                            );

                        }
                    );

                }

            }
        );



        catsVideo.addEventListener(
            "ended",
            function () {

                document
                    .getElementById(
                        "catsPage"
                    )
                    .scrollIntoView({
                        behavior: "smooth"
                    });

                /*
                   IMPORTANT:

                   Do NOT stop birthdaySong.
                */

            }
        );



        /* =================================================
           CAT BUTTONS
        ================================================= */

        const catButtons =
            document.querySelectorAll(
                ".cat-button"
            );


        catButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {


                        const targetId =
                            button.dataset.catPage;


                        const target =
                            document.getElementById(
                                targetId
                            );


                        if (!target) {

                            console.log(
                                "Page not found:",
                                targetId
                            );

                            return;

                        }


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }
                );

            }
        );



        /* =================================================
           BACK BUTTONS
        ================================================= */

        const backButtons =
            document.querySelectorAll(
                ".cat-back-button"
            );


        backButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {


                        const targetId =
                            button.dataset.back
                            ||
                            "catsPage";


                        const target =
                            document.getElementById(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        target.scrollIntoView({
                            behavior: "smooth"
                        });


                        /*
                           Birthday song continues.
                        */

                    }
                );

            }
        );



        /* =================================================
           BLOW THE CANDLE
        ================================================= */

        const blowButton =
            document.getElementById(
                "blowButton"
            );


        const birthdayNotePage =
            document.getElementById(
                "birthdayNotePage"
            );


        blowButton.addEventListener(
            "click",
            function () {


                blowButton.innerHTML =
                    "♡";


                blowButton.style.transform =
                    "scale(.9)";


                setTimeout(
                    function () {

                        blowButton.style.transform =
                            "scale(1)";

                    },
                    150
                );


                setTimeout(
                    function () {

                        birthdayNotePage.scrollIntoView({
                            behavior: "smooth"
                        });

                    },
                    500
                );

            }
        );



        /* =================================================
           BACK FROM NOTE
        ================================================= */

        const noteBackButton =
            document.getElementById(
                "noteBackButton"
            );


        noteBackButton.addEventListener(
            "click",
            function () {

                document
                    .getElementById(
                        "cakePage"
                    )
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );



        /* =================================================
           REMOVE WHITE BACKGROUND FROM BESTIE JPGs
           
           This creates transparent cutouts on the fly.
           
           You DON'T need to convert the JPG files.
        ================================================= */

        function createCutout(
            imagePath,
            canvasId
        ) {


            const canvas =
                document.getElementById(
                    canvasId
                );


            if (!canvas) {
                return;
            }


            const ctx =
                canvas.getContext(
                    "2d"
                );


            const image =
                new Image();


            image.onload =
                function () {


                    canvas.width =
                        image.naturalWidth;

                    canvas.height =
                        image.naturalHeight;


                    ctx.clearRect(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );


                    ctx.drawImage(
                        image,
                        0,
                        0
                    );


                    const imageData =
                        ctx.getImageData(
                            0,
                            0,
                            canvas.width,
                            canvas.height
                        );


                    const pixels =
                        imageData.data;


                    /*
                       Remove pixels that are
                       close to white.

                       This preserves the actual
                       subject while making the
                       white JPG background transparent.
                    */

                    for (
                        let i = 0;
                        i < pixels.length;
                        i += 4
                    ) {


                        const red =
                            pixels[i];

                        const green =
                            pixels[i + 1];

                        const blue =
                            pixels[i + 2];


                        /*
                           Very light pixels
                           become transparent.
                        */

                        if (
                            red > 238
                            &&
                            green > 238
                            &&
                            blue > 238
                        ) {

                            pixels[i + 3] = 0;

                        }


                        /*
                           Soft transition for
                           near-white edges.
                        */

                        else if (
                            red > 220
                            &&
                            green > 220
                            &&
                            blue > 220
                        ) {


                            const brightness =
                                (
                                    red
                                    +
                                    green
                                    +
                                    blue
                                ) / 3;


                            const alpha =
                                Math.max(
                                    0,
                                    Math.min(
                                        255,
                                        (
                                            238
                                            -
                                            brightness
                                        ) * 14
                                    )
                                );


                            pixels[i + 3] =
                                alpha;

                        }

                    }


                    ctx.putImageData(
                        imageData,
                        0,
                        0
                    );

                };


            image.onerror =
                function () {

                    console.log(
                        "Could not load:",
                        imagePath
                    );

                };


            image.src =
                imagePath;

        }



        createCutout(
            "assets/bestie1.jpg",
            "bestieCanvas1"
        );


        createCutout(
            "assets/bestie2.jpg",
            "bestieCanvas2"
        );


    }
);