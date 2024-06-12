import { redirect } from "next/navigation";

export const updateQuery = (formData: FormData) => {
    const queryValue = formData.get('query');

    // Update or set the query parameter
    if (queryValue) {
        console.log(queryValue);
        redirect(`?q=${queryValue}`);
    }

};
