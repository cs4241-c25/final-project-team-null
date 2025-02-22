import ActionButtonComponent from "./DeleteButtonComponent.jsx";


function GameSelectionComponent({list, name, year, handleGameDelete}) {

    return (
        <>
            <div className="flex flex-row align-center justify-evenly">
                <p className="text-base">{name} ({year})</p>
                <ActionButtonComponent action={() => handleGameDelete(list, name, year)}/>
            </div>
        </>
    )

}

export default GameSelectionComponent
