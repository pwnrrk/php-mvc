import Button from "../components/Button";
import Logo from "../../assets/logo.png";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { BASE_URL } from "../constant";

export default function Home() {
    function gotoDocs() {
        window.location.href = `${BASE_URL}/docs`;
    }

    return (
        <div className="text-gray-700 w-screen h-screen flex flex-col items-center justify-center">
            <section
                id="banner"
                className="gap-4 pb-16 min-h-[30vh] flex flex-col items-center justify-center"
            >
                <img src={Logo} alt="PHPReact" className="w-[160px]" />
                <h1 className="text-5xl font-semibold">PHP + React</h1>
                <h2 className="text-3xl font-medium my-4">
                    The MVC PHP with React Typescript starter project
                </h2>
                <div className="flex gap-4">
                    <Button
                        className="text-lg px-4"
                        onClick={function () {
                            document
                                .getElementById("about")
                                ?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        Explore
                    </Button>
                    <Button
                        variant="secondary"
                        className="text-lg px-4"
                        onClick={gotoDocs}
                    >
                        Documentation
                    </Button>
                </div>
            </section>
        </div>
    );
}
