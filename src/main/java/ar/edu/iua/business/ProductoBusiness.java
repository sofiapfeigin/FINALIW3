package ar.edu.iua.business;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import ar.edu.iua.business.exception.BusinessException;
import ar.edu.iua.business.exception.NotFoundException;
import ar.edu.iua.model.Producto;
import ar.edu.iua.model.persistence.ProductoRepository;

@Service
public class ProductoBusiness implements IProductoBusiness {

	@Autowired
	private ProductoRepository productoDAO;

	@Override
	public Producto load(long id, String nombre) throws NotFoundException, BusinessException {
		Optional<Producto> producto = null;
		try {
			System.out.println(nombre + " " + id);
			if (id != 0 && nombre.equals("*"))
				producto = productoDAO.findById(id);
			if (id == 0 && !nombre.equals("*"))
				producto = productoDAO.findByNombre(nombre);
			if (id != 0 && (!nombre.equals("*")))
				producto = productoDAO.findByNombreAndId(nombre, id);

		} catch (Exception e) {
			throw new BusinessException(e);
		}
		if (!producto.isPresent())
			throw new NotFoundException("El Chofer no se encuentra en la BD");

		return producto.get();
	}

	@Override
	public List<Producto> list() throws BusinessException {
		try {
			return productoDAO.findAll();
		} catch (Exception e) {
			throw new BusinessException(e);
		}
	}

	@Override
	public Producto add(Producto producto) throws BusinessException {
		try {

			if (producto.checkBasicData() == null)
				return productoDAO.save(producto);
			else
				throw new BusinessException();
		} catch (Exception e) {
			throw new BusinessException(e);
		}

	}

	@Override
	public Producto update(Producto producto, long id) throws NotFoundException, BusinessException {
		Producto productoNuevo = new Producto();
		Producto productoViejo = load(id, "*");

		productoNuevo.setId(id);

		if (producto.getDescripcion().equals(null) || producto.getDescripcion().trim().length() == 0)
			productoNuevo.setDescripcion(productoViejo.getDescripcion());
		else
			productoNuevo.setDescripcion(producto.getDescripcion());

		if (producto.getNombre().equals(null) || producto.getNombre().trim().length() == 0)
			productoNuevo.setNombre(productoViejo.getNombre());
		else
			productoNuevo.setNombre(producto.getNombre());

		return add(productoNuevo);

	}

	@Override
	public void delete(long id) throws NotFoundException, BusinessException {
		try {
			productoDAO.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new NotFoundException("No se encuentra el producto con id=" + id);
		} catch (Exception e) {
			throw new BusinessException(e);
		}

	}

	@Override
	public Producto load(String codigoExterno) throws NotFoundException, BusinessException {
		Optional<Producto> producto;
		try {
			producto = productoDAO.findFirstByCodigoexterno(codigoExterno);
		} catch (Exception e) {
			throw new BusinessException(e);
		}
		if (!producto.isPresent())
			throw new NotFoundException(
					"El producto con codigo externo " + codigoExterno + " no se encuentra en la BD");
		return producto.get();
	}

	@Override
	public Producto asegurarProducto(Producto producto) throws BusinessException {
		Producto p = null;
		try {
			p = load(producto.getCodigoexterno());
			p.setNombre(producto.getNombre());
			p.setDescripcion(producto.getDescripcion());

		} catch (NotFoundException e) {
			p = new Producto(producto);
		}
		return productoDAO.save(p);
	}

}