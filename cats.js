document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================
           ONE AUDIO ELEMENT
        ================================= */

        const song =
            document.getElementById(
                "birthdaySong"
            );


        /*
            This is the ONLY audio element
            used for the entire cats section.
        */

        song.loop = true;

        song.volume = 1;


        /* =================================
           START SONG
        ================================= */

        function startSong() {

            if (song.paused) {

                song.play().catch(
                    function () {

                        /*
                            Browser autoplay protection.

                            The first click on a cat
                            will definitely count as
                            user interaction, so the
                            song will start there.
                        */

                    }
                );

            }

        }


        /*
            Try automatically first.
        */

        startSong();


        /* =================================
           CAT PAGES
        ================================= */

        const catButtons =
            document.querySelectorAll(
                ".cat-button"
            );


        const pages =
            document.querySelectorAll(
                ".page, .cat-detail-page"
            );


        catButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {


                        /*
                            THIS click is a real
                            user interaction.

                            Therefore the browser
                            allows the audio to play.
                        */

                        startSong();


                        /*
                            Find destination.
                        */

                        const destination =
                            button.dataset.cat;


                        /*
                            Hide every page.
                        */

                        pages.forEach(
                            function (page) {

                                page.classList.remove(
                                    "active-page"
                                );

                            }
                        );


                        /*
                            Show selected cat page.
                        */

                        const target =
                            document.getElementById(
                                destination
                            );


                        if (target) {

                            target.classList.add(
                                "active-page"
                            );

                        }

                    }
                );

            }
        );


        /* =================================
           BACK BUTTONS
        ================================= */

        const backButtons =
            document.querySelectorAll(
                ".back-button"
            );


        backButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {


                        /*
                            IMPORTANT:
                            We do NOT stop the song.
                            We do NOT reset it.
                        */

                        pages.forEach(
                            function (page) {

                                page.classList.remove(
                                    "active-page"
                                );

                            }
                        );


                        document
                            .getElementById(
                                "catsPage"
                            )
                            .classList.add(
                                "active-page"
                            );

                    }
                );

            }
        );


    }
);