#!/usr/bin/env python3
"""
Lê ~/.local/share/contador-janelas/trocas.csv (gerado pela extensão)
e mostra quantas trocas de aplicativo você fez.

Uso:
    python3 resumo_trocas.py              # última hora
    python3 resumo_trocas.py --minutos 30
    python3 resumo_trocas.py --hoje
"""
import argparse
import csv
from collections import Counter
from datetime import datetime, timedelta
from pathlib import Path

ARQUIVO = Path.home() / ".local/share/contador-janelas/trocas.csv"


def ler_trocas():
    if not ARQUIVO.exists():
        raise SystemExit(f"Arquivo não encontrado: {ARQUIVO}\nA extensão está ativa?")
    with ARQUIVO.open(newline="", encoding="utf-8") as f:
        return [
            (datetime.fromisoformat(r[0]), r[1], r[2])
            for r in csv.reader(f)
            if len(r) == 3
        ]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--minutos", type=int, default=60)
    ap.add_argument("--hoje", action="store_true", help="considera desde 00:00")
    args = ap.parse_args()

    agora = datetime.now()
    if args.hoje:
        inicio = agora.replace(hour=0, minute=0, second=0, microsecond=0)
        rotulo = "hoje"
    else:
        inicio = agora - timedelta(minutes=args.minutos)
        rotulo = f"últimos {args.minutos} min"

    trocas = [t for t in ler_trocas() if t[0] >= inicio]
    print(f"{len(trocas)} trocas ({rotulo})")

    if not trocas:
        return

    print("\nApps que mais receberam foco:")
    for app, n in Counter(t[2] for t in trocas).most_common(5):
        print(f"  {app}: {n}x")

    print("\nTrocas por hora:")
    por_hora = Counter(t[0].strftime("%H:00") for t in trocas)
    for hora in sorted(por_hora):
        print(f"  {hora}  {'█' * min(por_hora[hora], 50)} {por_hora[hora]}")


if __name__ == "__main__":
    main()
