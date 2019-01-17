

export const helpers = {
    selectOption
}

function selectOption(stageOption, props) {
        
    // animate cards
    const cont = document.querySelector('#room-option-cont');
    const options = Array.from(cont.querySelectorAll('.room-option'));
    document.body.style.overflowY = 'hidden';
    options.forEach(option => {
        option.style.pointerEvents = 'none';
        option.classList.remove("fadeIn");
    });

    let timer = 250;
    options.forEach(option => {
        setTimeout(() => {
            option.classList.add('fadeOut');
        }, timer);
        timer += 150;
    });

    setTimeout(() => {
        document.body.style.overflowY = 'auto';
        options.forEach(option => {
            option.style.pointerEvents = 'auto';
        });

        // update state
        props.nextStageAction({
            stage: props.state.dashboard.newRoom.stage + 1,
            ...stageOption
        });
    }, 1200);
}