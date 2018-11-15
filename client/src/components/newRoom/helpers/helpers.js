

export const helpers = {
    selectOption
}

function selectOption(e, stageOption, props) {
        
    // animate cards
    const cont = document.querySelector('#room-option-cont');
    document.body.style.overflowY = 'hidden';
    Array.from(cont.querySelectorAll('.room-option')).forEach(option => {
        option.style.pointerEvents = 'none';
        option.classList.remove("fadeIn");
    });

    e.target.classList.add("pulse");

    let timer = 750;
    Array.from(cont.querySelectorAll('.room-option')).forEach(option => {
        setTimeout(() => {
            option.classList.remove("pulse");
            option.classList.add("fadeOutDown");
        }, timer);
        timer += 150;
    });

    setTimeout(() => {
        document.body.style.overflowY = 'auto';
        Array.from(cont.querySelectorAll('.room-option')).forEach(option => {
            option.style.pointerEvents = 'auto';
        });

        // update state
        props.nextStageAction({
            stage: props.state.dashboard.newRoom.stage + 1,
            ...stageOption
        });
    }, 2000);
}