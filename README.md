<h1 align="center">FaleMais App Server</h1>
<p align="center">REST API for <a href="https://github.com/viniciuslucas95/falemais-client-web">FaleMais App Client</a> project.</p>
<h2>How to setup localhost for testing on Ubuntu</h2>
<p>1. Install all the packages with "npm install".</p>
<p>2. Start the docker containers with "docker-compose up -d".</p>
<p>3. Start the server on dev mode with "npm run dev".</p>
<p>4. It's done. Now you can make HTTP requests to http://localhost:3001/.</p>
<h3>Routes</h3>
<p><i>{} = body, -> = returning values</i></p>
<h4>Tariffs</h4>
<p>GET ALL /tariffs -> [{id: string, originDdd: number, destinyDdd: number, pricePerMin: number}, ...]</p>
<p>GET ONE /tariffs/:id -> {id: string, originDdd: number, destinyDdd: number, pricePerMin: number}</p>
<p>CREATE /tariffs {originDdd: number, destinyDdd: number, pricePerMin: number} -> {id: string}</p>
<p>UPDATE /tariffs/:id {originDdd?: number, destinyDdd?: number, pricePerMin?: number} <i>* At least one value must be sent</i></p>
<p>DELETE /tariffs/:id</p>
<h4>Plans</h4>
<p>GET ALL /plans -> [{id: string, name: string, bonus: number}, ...]</p>
<p>GET ONE /plans/:id -> {id: string, name: string, bonus: number}</p>
<p>CREATE /plans {name: string, bonus: number} -> {id: string}</p>
<p>UPDATE /plans/:id {name?: string, bonus?: number} <i>* At least one value must be sent</i></p>
<p>DELETE /plans/:id</p>