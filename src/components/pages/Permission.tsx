import { useContext } from 'react';
import styles from './Permission.module.css'
import { PermissionContext } from '../../contexts/Permission/PermissionContext';
import { spawn } from 'child_process';

export const Permission = () => {
    const auth = useContext(PermissionContext);

    return (
        <div>
           <h1>Modulo de Pemissoes</h1> 
           {auth.permissionList.length > 0 && auth.permissionList.map((project) => (
            <div>
                <span>{project.id}</span>
                <span>{project.description}</span>
                <span>{project.permission}</span>
            </div>
           ))}
        </div>
    );
}