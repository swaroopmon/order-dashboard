interface Props {
    status: string;
}

export default function StatusBadge({ status }: Props) {

    let classes =
        "px-3 py-1 rounded-full text-sm font-semibold";

    switch (status.toLowerCase()) {

        case "pending":
            classes += " bg-yellow-100 text-yellow-700";
            break;

        case "processing":
            classes += " bg-blue-100 text-blue-700";
            break;

        case "completed":
            classes += " bg-green-100 text-green-700";
            break;

        case "cancelled":
            classes += " bg-red-100 text-red-700";
            break;

        default:
            classes += " bg-gray-100 text-gray-700";
    }

    return (
        <span className={classes}>
            {status}
        </span>
    );
}