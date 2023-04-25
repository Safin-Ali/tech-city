import { centerModeCallBackValue, viewPortValue } from "./default-props";

interface Props {
    transition: boolean,
    centerModeCallBack: Function,
    translateIndex: number,
    slidePercentage: number,
    handleDispatch: Function,
    maxSlideIndex: number,
    AIChange: boolean,
    slideDirection: boolean,
    viewPort: number
}

interface ReturnType {
    handleInfinitedNext: () => void,
    handleInfinitedPrev: () => void,
    handleLimitedNext: () => void,
    handleLimitedPrev: () => void,
    handleLimitedChangeAI: () => void,
    handleInfiniteChangeAI: () => void,
}

function useSliderController({
    transition = true,
    centerModeCallBack = centerModeCallBackValue,
    translateIndex = 0,
    slidePercentage = 0,
    handleDispatch = () => { },
    maxSlideIndex = 0,
    slideDirection = true,
    viewPort = viewPortValue
}: Props): ReturnType {

    const forwardReset = () => {
        setTimeout(() => {
            handleDispatch(`translateMinIndex`);
            centerModeCallBack(`first`);
            handleDispatch(`transitionBool`, false);
        }, 315)
    };

    const backwardReset = () => {
        setTimeout(() => {
            handleDispatch(`translateMaxIndex`);
            centerModeCallBack(`last`);
            handleDispatch(`transitionBool`, false);
        }, 315)
    };

    const handleClearTimerId = (): void => {
        handleDispatch(`clearTimerId`)
    };

    const handleLimitedNext = (): void => {
        handleClearTimerId()
        handleDispatch(`limitedInc`);
    };

    const handleLimitedChangeAI = (): void => {

        const extraVal = viewPort !== 1 ? slidePercentage : 0

        if (slideDirection) {
            if (translateIndex + extraVal>= maxSlideIndex) {
                handleDispatch(`setDirection`, false)
                handleDispatch(`limitedDec`)
            } else {
                handleDispatch(`limitedInc`);
            }
        } else {
            if (translateIndex <= 0) {
                handleDispatch(`setDirection`, true);
                handleDispatch(`limitedInc`);
            } else {
                handleDispatch(`limitedDec`)
            }
        }
    };

    const handleLimitedPrev = (): void => {
        handleClearTimerId()
        handleDispatch(`limitedDec`)
    };

    const handleInfinitedNext = (): void => {
        handleClearTimerId()
        centerModeCallBack(`increment`);
        if (!transition) handleDispatch(`transitionBool`, true);
        if (translateIndex + slidePercentage >= maxSlideIndex) forwardReset();
        handleDispatch(`infiniteInc`)

    };

    const handleInfiniteChangeAI = (): void => {
        centerModeCallBack(`increment`);
        if (!transition) handleDispatch(`transitionBool`, true);
        if (translateIndex + slidePercentage >= maxSlideIndex) forwardReset();
        handleDispatch(`infiniteInc`)

    };

    const handleInfinitedPrev = (): void => {
        handleClearTimerId()
        centerModeCallBack(`decrement`);
        if (!transition) handleDispatch(`transitionBool`, true);
        if (translateIndex + slidePercentage <= slidePercentage) {
            handleDispatch(`infiniteDec`)
            return backwardReset()
        }
        handleDispatch(`infiniteDec`)
    };

    return {
        handleInfinitedNext,
        handleInfinitedPrev,
        handleLimitedNext,
        handleLimitedPrev,
        handleLimitedChangeAI,
        handleInfiniteChangeAI
    };
};
export default useSliderController;