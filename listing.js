$(document).ready(() => {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
    document.addEventListener("dragstart", (event) => event.preventDefault());
    document.cookie = "transRights=thankYou; expires=Fri, 31 Dec 9999 23:59:59 GMT"; //does nothing but will leave a message to people hate-reading

    console.log("%cSTOP!", "font-size: 50px; color: red; font-weight: bold; text-shadow: 1px 1px 5px black;");
    console.log("%cThis is a browser feature intended for developers. If someone told you to copy and paste something here, it is a scam and will give them access to your account and personal information.", "font-size: 16px;");
    console.log("%cIf you need to contact me, feel free to add me on Discord: mwikka", "font-size: 16px;");

    $.getJSON("claims.json", (data) => {
        const $claimsContainer = $(".claims");
        const claims = data.claims;

        claims.forEach((claim, index) => {
            const $claim = $("<div>").addClass("claim fade-in");
            const $h2 = $("<h2>").text(`Claim ${index + 1}: ${claim.claim}`);
            const $fact = $("<p>").text(`Fact: ${claim.fact}`);

            const $sourceContainer = $("<p>").html(`Source${claim.source.length === 0 ? "s: N/A" : claim.source.length === 1 ? ": " : "s: "}`);
            claim.source.forEach((sourceUrl, i) => {
                if (i > 0) {
                    $sourceContainer.append(" | ");
                }
                const $sourceLink = $("<a>")
                    .attr("href", sourceUrl)
                    .attr("target", "_blank")
                    .text(`Source ${i + 1}`);
                const $archiveLink = $("<a>").attr("href", `https://web.archive.org/web/${sourceUrl}`).attr("target", "_blank").css("font-size", "65%").text(`[Archive]`);
                $sourceContainer.append($sourceLink, " ", $archiveLink);
            });

            $claim.append($h2, $fact, $sourceContainer);
            $claimsContainer.append($claim);
        });

        fadeInClaims();
    });
});

// Get all claims
const fadeInClaims = () => {
    const claims = document.querySelectorAll(".claim");

    claims.forEach((claim) => {
        const { top, bottom } = claim.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const threshold = 100;

        if (top + threshold < windowHeight && bottom > 0) {
            claim.classList.add("opacity-100", "translate-y-0");
        }
    });
};

window.addEventListener("scroll", fadeInClaims);