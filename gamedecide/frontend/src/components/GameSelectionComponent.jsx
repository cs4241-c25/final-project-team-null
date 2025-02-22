import ActionButtonComponent from "./DeleteButtonComponent.jsx";


function GameSelectionComponent({list, name, year, handleGameDelete}) {

    return (
        <>
            <div>
                <p>{name} ({year})</p>
                <ActionButtonComponent action={() => handleGameDelete(list, name, year)}/>
            </div>
        </>
    )

}

export default GameSelectionComponent
