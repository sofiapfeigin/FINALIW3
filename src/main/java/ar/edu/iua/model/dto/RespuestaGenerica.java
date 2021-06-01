package ar.edu.iua.model.dto;

public class RespuestaGenerica<T> {
	
	private T entidad; 
	private MensajeRespuesta mensaje;
	
	public RespuestaGenerica(T entidad, MensajeRespuesta mensaje) {
		super();
		this.entidad = entidad;
		this.mensaje = mensaje;
	}

	public T getEntidad() {
		return entidad;
	}

	public void setEntidad(T entidad) {
		this.entidad = entidad;
	}

	public MensajeRespuesta getMensaje() {
		return mensaje;
	}

	public void setMensaje(MensajeRespuesta mensaje) {
		this.mensaje = mensaje;
	} 
	
	
	
	
	
	

}
