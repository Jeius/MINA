const categoryColors = {
    "Vibrant Orange": "#FF5733",
    "Bright Green": "#33FF57",
    "Bold Blue": "#3357FF",
    "Hot Pink": "#FF33A8",
    "Aqua": "#33FFF5",
    "Vivid Purple": "#8C33FF",
    "Lime Green": "#33FF8C",
    "Bright Red": "#FF3333",
    "Mint": "#33FFB5",
    "Magenta": "#FF33D4",
    "Turquoise": "#33FFFC",
    "Rose": "#FF3380",
    "Coral": "#FF6F61",
    "Teal": "#008080"
}

export const ExploreSVG = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24" {...props}
    >
        <path
            fill={props.fill}
            d="M6.5 17.5L14 14l3.5-7.5L10 10l-3.5 7.5ZM12 13q-.425 0-.713-.288T11 12q0-.425.288-.713T12 11q.425 0 .713.288T13 12q0 .425-.288.713T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
        ></path>
    </svg>
)

export const DirectionsSVG = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 512 512" {...props}
    >
        <path
            fill={props.fill}
            d="M502.61 233.32L278.68 9.39c-12.52-12.52-32.83-12.52-45.36 0L9.39 233.32c-12.52 12.53-12.52 32.83 0 45.36l223.93 223.93c12.52 12.53 32.83 12.53 45.36 0l223.93-223.93c12.52-12.53 12.52-32.83 0-45.36zm-100.98 12.56l-84.21 77.73c-5.12 4.73-13.43 1.1-13.43-5.88V264h-96v64c0 4.42-3.58 8-8 8h-32c-4.42 0-8-3.58-8-8v-80c0-17.67 14.33-32 32-32h112v-53.73c0-6.97 8.3-10.61 13.43-5.88l84.21 77.73c3.43 3.17 3.43 8.59 0 11.76z"></path>
    </svg>
)

export const PlacesSVG = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 256 256" {...props}>
        <path
            fill={props.fill}
            d="M239.73 208H224V96a16 16 0 0 0-16-16h-44a4 4 0 0 0-4 4v124h-16V32.41a16.43 16.43 0 0 0-6.16-13a16 16 0 0 0-18.72-.69L39.12 72A16 16 0 0 0 32 85.34V208H16.27A8.18 8.18 0 0 0 8 215.47a8 8 0 0 0 8 8.53h224a8 8 0 0 0 8-8.53a8.18 8.18 0 0 0-8.27-7.47ZM76 184a8 8 0 0 1-8.53 8a8.18 8.18 0 0 1-7.47-8.28v-15.45a8.19 8.19 0 0 1 7.47-8.27a8 8 0 0 1 8.53 8Zm0-56a8 8 0 0 1-8.53 8a8.19 8.19 0 0 1-7.47-8.28v-15.45a8.19 8.19 0 0 1 7.47-8.27a8 8 0 0 1 8.53 8Zm40 56a8 8 0 0 1-8.53 8a8.18 8.18 0 0 1-7.47-8.26v-15.47a8.19 8.19 0 0 1 7.47-8.26a8 8 0 0 1 8.53 8Zm0-56a8 8 0 0 1-8.53 8a8.19 8.19 0 0 1-7.47-8.26v-15.47a8.19 8.19 0 0 1 7.47-8.26a8 8 0 0 1 8.53 8Z"></path>
    </svg>
)

export const SearchSVG = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 42 42" {...props}>
        <path
            fill={props.fill}
            d="M1 17.838c0 8.747 7.131 15.827 15.94 15.827c8.796 0 15.938-7.08 15.938-15.827S25.736 2 16.94 2C8.131 2 1 9.091 1 17.838zm5.051 0c0-5.979 4.868-10.817 10.89-10.817c6.01 0 10.888 4.839 10.888 10.817c0 5.979-4.878 10.818-10.888 10.818c-6.022 0-10.89-4.84-10.89-10.818zm22.111 14.523l6.855 7.809c1.104 1.102 1.816 1.111 2.938 0l2.201-2.181c1.082-1.081 1.149-1.778 0-2.921l-7.896-6.775l-4.098 4.068z"></path>
    </svg>
)

export const CancelSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 42 42" {...props}>
        <path fill={props.fill} fillRule="evenodd" d="m21.002 26.588l10.357 10.604c1.039 1.072 1.715 1.083 2.773 0l2.078-2.128c1.018-1.042 1.087-1.726 0-2.839L25.245 21L36.211 9.775c1.027-1.055 1.047-1.767 0-2.84l-2.078-2.127c-1.078-1.104-1.744-1.053-2.773 0L21.002 15.412L10.645 4.809c-1.029-1.053-1.695-1.104-2.773 0L5.794 6.936c-1.048 1.073-1.029 1.785 0 2.84L16.759 21L5.794 32.225c-1.087 1.113-1.029 1.797 0 2.839l2.077 2.128c1.049 1.083 1.725 1.072 2.773 0l10.358-10.604z"></path>
    </svg>
)

export const LocationSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
        <g fill="none">
            <path fill="#111827" fillRule="evenodd" d="M17.5 16.5L12 22l-5.5-5.5a7.778 7.778 0 1 1 11 0ZM12 12a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z" clipRule="evenodd" opacity="0.8"></path>
            <path stroke="#111827" strokeLinejoin="round" strokeWidth="3" d="M12 11h.01v.01H12z"></path>
            <path stroke="#9ca3af" strokeLinejoin="round" strokeWidth="1" d="m12 22l5.5-5.5a7.778 7.778 0 1 0-11 0L12 22Z"></path>
        </g>
    </svg>
)

export const CollegeSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15" {...props}>
        <path fill="currentColor" d="M7.5 1L0 4.5l2 .9v1.7c-.6.2-1 .8-1 1.4s.4 1.2 1 1.4v.1l-.9 2.1C.8 13 1 14 2.5 14s1.7-1 1.4-1.9L3 10c.6-.3 1-.8 1-1.5s-.4-1.2-1-1.4V5.9L7.5 8L15 4.5L7.5 1zm4.4 6.5l-4.5 2L5 8.4v.1c0 .7-.3 1.3-.8 1.8l.6 1.4v.1c.1.4.2.8.1 1.2c.7.3 1.5.5 2.5.5c3.3 0 4.5-2 4.5-3v-3z"></path>
    </svg>
)

export const LaboratorySVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 23 24" {...props}>
        <path fill="currentColor" d="M22.171 19.68L14.819 8.369V2.962h1.708V0H6.098v2.965H7.82v5.407L.454 19.68A2.792 2.792 0 0 0 2.791 24h17.034a2.8 2.8 0 0 0 2.34-4.331l.007.011zm-.905 2.302a1.633 1.633 0 0 1-1.434.854H2.791a1.635 1.635 0 0 1-1.37-2.531l-.004.006l7.549-11.6V2.96h4.686v5.754l7.541 11.6c.17.251.272.561.272.895c0 .285-.074.553-.204.785l.004-.008z"></path>
        <path fill="currentColor" d="M14.412 12.351H8.221l-5.655 8.698a.287.287 0 0 0-.012.299l-.001-.001c.05.087.142.145.248.146h17.032a.283.283 0 0 0 .247-.145l.001-.001a.283.283 0 0 0-.013-.298l.001.001z"></path>
    </svg>
)

export const ClinicSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15" {...props}>
        <path fill="currentColor" d="M7 1c-.6 0-1 .4-1 1v4H2c-.6 0-1 .4-1 1v1c0 .6.4 1 1 1h4v4c0 .6.4 1 1 1h1c.6 0 1-.4 1-1V9h4c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H9V2c0-.6-.4-1-1-1H7z"></path>
    </svg>
)

export const BuildingSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
        <path fill="currentColor" d="M17 2H7a2 2 0 0 0-2 2v17a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2zm-6 14H8v-2h3v2zm0-4H8v-2h3v2zm0-4H8V6h3v2zm5 8h-3v-2h3v2zm0-4h-3v-2h3v2zm0-4h-3V6h3v2z"></path>
    </svg>
)

export const HallSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...props}>
        <path fill="currentColor" fillRule="evenodd" d="M7.605 2.112a.75.75 0 0 1 .79 0l5.25 3.25A.75.75 0 0 1 13 6.707V12.5h.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H3V6.707a.75.75 0 0 1-.645-1.345zM4.5 8.75a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-1.5 0zM8 8a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 8 8m2 .75a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-1.5 0zM8 6a1 1 0 1 0 0-2a1 1 0 0 0 0 2" clipRule="evenodd"></path>
    </svg>
)

export const FoodSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" {...props}>
        <path fill="currentColor" d="M18 11v7a2 2 0 0 1-4 0v-5h-2V3a3 3 0 0 1 3-3h3v11zM4 10a2 2 0 0 1-2-2V1a1 1 0 0 1 2 0v4h1V1a1 1 0 0 1 2 0v4h1V1a1 1 0 0 1 2 0v7a2 2 0 0 1-2 2v8a2 2 0 0 1-4 0v-8z"></path>
    </svg>
)

export const HostelSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" {...props}>
        <path fill="currentColor" d="M2 12h18v6h-2v-2H2v2H0V2h2v10zm8-6h8a2 2 0 0 1 2 2v3H10V6zm-4 5a3 3 0 1 1 0-6a3 3 0 0 1 0 6z"></path>
    </svg>
)

export const LibrarySVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15" {...props}>
        <path fill="currentColor" d="M1.082 9.939C.987 9.867 1 9.748 1 9.748L1.526 3.5s.008-.069.039-.104c.019-.022.043-.054.09-.073C2.182 3.107 5.053 1.552 6.5 3c.24.278.5.688.5 1v5.288s.006.112-.095.18a.252.252 0 0 1-.242.003c-2.226-1.114-4.711.154-5.338.487a.22.22 0 0 1-.243-.02zm12.593.019c-.627-.333-3.112-1.6-5.338-.487a.252.252 0 0 1-.242-.003C7.994 9.4 8 9.288 8 9.288V4c0-.312.26-.722.5-1c1.446-1.448 4.3.107 4.827.323c.046.019.07.051.09.073c.03.035.039.104.039.104l.543 6.248s.014.119-.08.19a.22.22 0 0 1-.244.02zm-4.81 2.728a.24.24 0 0 0 .118-.077a.214.214 0 0 0 .042-.109c.05-.938 1.624-1.812 4.648-.03c.077.044.166.04.242-.015c.086-.063.085-.17.085-.17v-.553s0-.077-.027-.119a.227.227 0 0 0-.093-.085c-2.025-1.315-4.586-1.898-5.885-.16a.197.197 0 0 1-.073.09c-.057.045-.126.042-.126.042h-.585s-.07.003-.126-.041a.197.197 0 0 1-.073-.09c-1.3-1.739-3.86-1.184-5.885.131a.227.227 0 0 0-.093.086c-.027.042-.027.118-.027.118v.554s-.001.107.085.17a.22.22 0 0 0 .243.015c3.023-1.782 4.598-.88 4.647.057a.214.214 0 0 0 .043.109a.24.24 0 0 0 .118.077c.721.18 1.768.25 2.722 0z"></path>
    </svg>
)

export const OfficeSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" {...props}>
        <path fill="none" d="M336 80H176a16 16 0 0 0-16 16v16h192V96a16 16 0 0 0-16-16Z"></path>
        <path fill="currentColor" d="M496 176a64.07 64.07 0 0 0-64-64h-48V96a48.05 48.05 0 0 0-48-48H176a48.05 48.05 0 0 0-48 48v16H80a64.07 64.07 0 0 0-64 64v48h480Zm-144-64H160V96a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16Zm-16 152a24 24 0 0 1-24 24H200a24 24 0 0 1-24-24v-4a4 4 0 0 0-4-4H16v144a64 64 0 0 0 64 64h352a64 64 0 0 0 64-64V256H340a4 4 0 0 0-4 4Z"></path>
    </svg>
)

export const ParkSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
        <path fill="currentColor" d="M13.95 22h-3.9v-4H3l4-6H5l7-10l7 10h-2l4 6h-7.05v4Z"></path>
    </svg>
)

export const ParkingSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
        <path fill="currentColor" d="M10 15v4q0 .825-.588 1.413T8 21q-.825 0-1.413-.588T6 19V5q0-.825.588-1.413T8 3h5q2.5 0 4.25 1.75T19 9q0 2.5-1.75 4.25T13 15h-3Zm0-4h3.2q.825 0 1.413-.588T15.2 9q0-.825-.587-1.413T13.2 7H10v4Z"></path>
    </svg>
)

export const SchoolSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 640 512" {...props}>
        <path fill="currentColor" d="M337.8 5.4c-10.8-7.2-24.8-7.2-35.6 0L166.3 96H48c-26.5 0-48 21.5-48 48v320c0 26.5 21.5 48 48 48h544c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48H473.7L337.8 5.4zM256 416c0-35.3 28.7-64 64-64s64 28.7 64 64v96H256v-96zM96 192h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16v-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-64zM96 320h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16v-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-64zM232 176a88 88 0 1 1 176 0a88 88 0 1 1-176 0zm88-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-16v-16c0-8.8-7.2-16-16-16z"></path>
    </svg>
)

export const SecuritySVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1025 1024" {...props}>
        <path fill="currentColor" d="M512.95 1024q-84-42-152-89t-119-90t-89.5-102t-64-102.5T45.95 526t-26-116.5T6.45 279t-5-133T.95 0q0 26 75 45t181 19t181-19t75-45q0 26 75 45t181 19t181-19t75-45q0 98-.5 146t-5 133t-13.5 130.5t-26 116.5t-42.5 114.5t-64 102.5t-89.5 102t-119 90t-152 89zm0-896q0 26-56.5 45t-135.5 19q-54 0-107-9t-85-24q0 79 2 127t9.5 114.5t22.5 109.5t43 97t68.5 94t100.5 83t138 80V128zm0-128z"></path>
    </svg>
)

export const SportsSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
        <path fill="currentColor" d="M20.812 10.104L12.5 5.206V3.012q3.075.165 5.352 2.137t2.96 4.955ZM6.885 14.4V4.615q.994-.71 2.098-1.094q1.104-.384 2.523-.51v8.702L6.885 14.4Zm-2.927 1.667q-.489-.93-.733-1.958T2.981 12q0-1.887.729-3.572q.728-1.686 2.175-3.009v9.548l-1.927 1.1Zm4.188 4.06q-1.165-.558-2.092-1.346q-.927-.789-1.596-1.854l7.548-4.354l4.64 2.687l-8.5 4.867Zm3.86.873q-.69 0-1.358-.082t-1.294-.328l8.292-4.757l1.908 1.082q-1.271 1.912-3.255 2.998Q14.315 21 12.006 21Zm8.023-4.958L12.5 11.713V6.346l8.48 4.994q.058 1.227-.16 2.423q-.22 1.197-.791 2.28Z"></path>
    </svg>
)

export const ConstructionSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
        <path fill="currentColor" d="m18.9 21l-5.475-5.475l2.1-2.1L21 18.9L18.9 21ZM5.1 21L3 18.9L9.9 12l-1.7-1.7l-.7.7l-1.275-1.275v2.05l-.7.7L2.5 9.45l.7-.7h2.05L4 7.5l3.55-3.55q.5-.5 1.075-.725T9.8 3q.6 0 1.175.225t1.075.725l-2.3 2.3L11 7.5l-.7.7L12 9.9l2.25-2.25q-.1-.275-.162-.575t-.063-.6q0-1.475 1.013-2.488t2.487-1.012q.375 0 .713.075t.687.225L16.45 5.75l1.8 1.8l2.475-2.475q.175.35.238.687t.062.713q0 1.475-1.012 2.488t-2.488 1.012q-.3 0-.6-.05t-.575-.175L5.1 21Z"></path>
    </svg>
)