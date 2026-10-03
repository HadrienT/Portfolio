import { Route, Routes } from "react-router";
import { Layout } from "@/components/Layout";
import { HomePage } from "@/pages/HomePage";
import { QuantModelingPage } from "@/pages/QuantModelingPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route path="projects/quant-modeling" element={<QuantModelingPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
}
