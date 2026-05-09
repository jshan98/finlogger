import { Card } from "react-bootstrap";

/**
 * Function: getImageUrl
 * Description: gets the image URL by concatenating "./images/" to the imageName parameter
 * @param {*} imageName 
 * @returns String ("./images/imageName")
 */
export function getImageUrl(imageName){
    return ("./images/" + imageName);
}

function OverviewCard(props) {
    return(
        <Card>
            <Card.Body>
                <div className="d-flex align-items-center">
                    <div className="mr-3">
                        <Card.Img variant="top" src={getImageUrl(props.cardIcon)} alt={props.cardText}/>
                    </div>
                    <div>
                        <Card.Text >{props.cardText}</Card.Text>
                        <Card.Title >${props.cardTitle}</Card.Title>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default OverviewCard;