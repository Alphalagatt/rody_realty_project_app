import { useParams } from "react-router-dom";

function AgentsPropertyDetailsPage() {
    const { id} = useParams()
    return <div>This is where the datails of the property will go.
        You selected {id} ID.
    </div>
}

export default AgentsPropertyDetailsPage;