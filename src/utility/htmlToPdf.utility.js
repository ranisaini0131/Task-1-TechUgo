import pdf from "html-pdf"
import axios from "axios"


async function generatePDFfromURL(url, outputPath) {
    try {
        const response = await axios.get(url);
        const htmlContent = response.data;
        pdf.create(htmlContent).toFile(outputPath, (err, res) => {
            if (err) return console.log(err);
            console.log('PDF generated successfully:', res);
        });
    } catch (error) {
        console.error('Error fetching URL:', error);
    }
}

// Usage
generatePDFfromURL('https://google.com', 'google.pdf');

