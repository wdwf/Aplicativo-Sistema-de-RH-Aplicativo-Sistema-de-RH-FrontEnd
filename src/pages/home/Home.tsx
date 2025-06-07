function Home() {

    return (
        <>
            <div className="bg-blue-950 flex justify-center">
                <div className='container grid grid-cols-2 text-white'>
                    <div className="flex flex-col gap-4 items-center
                                    justify-center py-4">
                        <h2 className='text-5xl font-bold font-serif'>
                            RH Corp:
                        </h2>
                        <p className='text-xl font-serif'>
                            Organização e segurança para o seu RH        
                      </p>
                        
                    </div>

                    <div id="imagem" className="flex justify-center">
                        <img
                            src="https://img.freepik.com/fotos-gratis/designer-trabalhando-no-modelo-3d_23-2149371896.jpg?ga=GA1.1.682989809.1746536640&semt=ais_hybrid&w=740"
                            alt="Imagem da Página Home"
                            className="w-2/3"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
   export default Home