# **Вычислитель отличий**

## **Dependencies**

Этот проект использует следующие зависимости:

- **commander** – CLI-утилита для парсинга аргументов. Версия: `^8.3.0`
- **js-yaml** – YAML-парсер и сериализатор. Версия: `^4.1.0`
- **lodash** – Утилита для работы с данными (используется для сортировки ключей). Версия: `^4.17.21`

## **Installation**

Установите зависимости, выполнив команду:

```sh
npm install
```

## **How to Use gendiff**

### **Шаг 1: Сравнение двух JSON-файлов**

```sh
gendiff filepath1.json filepath2.json
gendiff <укажите директорию>/filepath1.json <укажите директорию>/filepath2.json
```

🎥 [Демонстрация](https://asciinema.org/a/hvdP3owhHgM7qBrhCb8t8iM5c)

### **Шаг 2: Сравнение двух YAML-файлов**

```sh
gendiff filepath1.yml filepath2.yml
gendiff <укажите директорию>/filepath1.yml <укажите директорию>/filepath2.yml
```

🎥 [Демонстрация](https://asciinema.org/a/Wgyj79nH1YMSVMYBdR2FNZeRK)

### **Шаг 3: Сравнение JSON и YAML-файлов**

```sh
gendiff filepath1.json filepath2.json
gendiff <укажите директорию>/filepath1.json <укажите директорию>/filepath2.json

gendiff filepath1.yml filepath2.yml
gendiff <укажите директорию>/filepath1.yml <укажите директорию>/filepath2.yml
```

🎥 [Демонстрация](https://asciinema.org/a/jbRf2w64tPBbUBsRQuQOuPf93)

### **Шаг 4: Вывод в формате plain**

```sh
gendiff --format plain filepath1.json filepath2.json
gendiff --format plain <укажите директорию>/filepath1.json <укажите директорию>/filepath2.json
```

🎥 [Демонстрация](https://asciinema.org/a/6nZwCt8OrYRMDrhot8gTpOxHf)

### **Шаг 5: Вывод в формате JSON**

```sh
gendiff --format json filepath1.json filepath2.json
gendiff --format json <укажите директорию>/filepath1.json <укажите директорию>/filepath2.json
```

🎥 [Демонстрация](https://asciinema.org/a/xHjmPzxJLPaHBXt7sq99GzyOZ)

## **Hexlet Tests and Linter Status**

[![Actions Status](https://github.com/user15213/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/user15213/frontend-project-46/actions)

[![Test Coverage](https://api.codeclimate.com/v1/badges/0ba337b1734fd420ec7d/test_coverage)](https://codeclimate.com/github/user15213/frontend-project-46/test_coverage)

![Code Climate Coverage](https://img.shields.io/codeclimate/coverage/user15213/frontend-project-46)
