import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import Shell from 'gi://Shell';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

// Formato de cada linha do CSV: horario,"app_anterior","app_novo"
export default class ContadorJanelas extends Extension {
    enable() {
        const dir = GLib.build_filenamev([GLib.get_user_data_dir(), 'contador-janelas']);
        GLib.mkdir_with_parents(dir, 0o755);
        this._arquivo = Gio.File.new_for_path(GLib.build_filenamev([dir, 'trocas.csv']));

        this._anterior = this._appAtual();
        this._handlerId = global.display.connect(
            'notify::focus-window',
            () => this._aoMudarFoco()
        );
    }

    disable() {
        if (this._handlerId) {
            global.display.disconnect(this._handlerId);
            this._handlerId = null;
        }
        this._arquivo = null;
        this._anterior = null;
    }

    _appAtual() {
        const janela = global.display.focus_window;
        if (!janela)
            return null;

        const app = Shell.WindowTracker.get_default().get_window_app(janela);
        return app?.get_name() ?? janela.get_wm_class() ?? null;
    }

    _aoMudarFoco() {
        const atual = this._appAtual();

        // Foco sem janela (area de trabalho, overview): ignora e mantem o anterior
        if (!atual || atual === this._anterior)
            return;

        if (this._anterior)
            this._gravar(this._anterior, atual);

        this._anterior = atual;
    }

    _gravar(de, para) {
        try {
            const agora = GLib.DateTime.new_now_local().format('%Y-%m-%dT%H:%M:%S');
            const csv = s => `"${s.replaceAll('"', '""')}"`;
            const linha = `${agora},${csv(de)},${csv(para)}\n`;

            const stream = this._arquivo.append_to(Gio.FileCreateFlags.NONE, null);
            stream.write_all(new TextEncoder().encode(linha), null);
            stream.close(null);
        } catch (e) {
            console.error(`[contador-janelas] Falha ao gravar: ${e}`);
        }
    }
}
