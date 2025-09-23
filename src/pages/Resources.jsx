import { useEffect, useState } from "react";
import { API } from "../api";

export default function Resources(){
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name:"", category:"Food", quantity:0, location:"" });

  const load = async ()=> setItems(await API.listResources());
  useEffect(()=>{ load(); },[]);

  const add = async (e)=>{ e.preventDefault(); await API.createResource(form); setForm({ name:"", category:"Food", quantity:0, location:"" }); await load(); };
  const updateQty = async (it, delta)=>{ await API.updateResource(it.id, {...it, quantity: it.quantity + delta}); await load(); };
  const remove = async (id)=>{ if(window.confirm("Delete resource?")){ await API.deleteResource(id); await load(); } };

  return (
    <div className="container">
      <h2>Resources</h2>
      <form onSubmit={add} className="card">
        <div className="grid" style={{gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:12}}>
          <input className="input" placeholder="Item name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
            <option>Food</option><option>Medical</option><option>Shelter</option><option>Other</option>
          </select>
          <input className="input" type="number" placeholder="Qty" value={form.quantity} onChange={e=>setForm({...form,quantity:Number(e.target.value)})}/>
          <input className="input" placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
        </div>
        <button className="btn">Add Resource</button>
      </form>

      <table className="table card">
        <thead><tr><th>Name</th><th>Category</th><th>Qty</th><th>Location</th><th>Actions</th></tr></thead>
        <tbody>
          {items.map(it=>(
            <tr key={it.id}>
              <td>{it.name}</td><td>{it.category}</td><td>{it.quantity}</td><td>{it.location}</td>
              <td>
                <button className="btn" onClick={()=>updateQty(it, +1)}>+1</button>
                <button className="btn" style={{marginLeft:8, background:"#c43"}} onClick={()=>updateQty(it, -1)}>-1</button>
                <button className="btn" style={{marginLeft:8, background:"#888"}} onClick={()=>remove(it.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
