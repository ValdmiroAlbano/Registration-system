import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


function usuariosPDF(usuarios) {

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [
        {
            text: 'Usuarios',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45] // left, top, rigth, bottom
        }
    ];

    const dados = usuarios.map((usuarios) =>{
        return[
                {text: usuarios.id,  fontSize: 9,  margin: [0, 2, 0, 2]},
                {text: usuarios.name,  fontSize: 9, margin: [0, 2, 0, 2]},
                {text: usuarios.email, fontSize: 9, margin: [0, 2, 0, 2]},
            ]
        });

    const detalhes = [
        {
            table:{
                headerRows: 1,
                widths:['*','*','*','*'],
                body:[
                    [
                        {text: 'Codigo', style: 'tableHeader', fontSize: 10},
                        {text: 'Nome', style: 'tableHeader', fontSize: 10},
                        {text: 'Email', style: 'tableHeader', fontSize: 10},
                    ],
                    ...dados
                ]
            },
            layout: 'lightHorizontalLines'  //'headerLineOnly'
        }
    ];

    function rodape(currentPage, pageCount){
        return[
            {
                text: currentPage + '/' + pageCount,
                alignment: 'right',
                fontSize: 9 , 
                margin: [0, 10, 20, 0] // left, top, rigth, bottom
            }
        ]
    }

    const docDifinicao = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        header: [reportTitle],
        content: [detalhes],
        footer: rodape
    }

    pdfMake.createPdf(docDifinicao).download();
}  

export default usuariosPDF