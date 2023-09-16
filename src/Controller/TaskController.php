<?php

namespace App\Controller;

use App\Entity\Task;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class TaskController extends AbstractController
{
    #[Route('/tasks', name: 'app_task', methods: ['GET'])]
    public function index(ManagerRegistry $managerRegistry): Response
    {
        $tasks = $managerRegistry->getRepository(Task::class)->findAll();

        $data = [];

        foreach ($tasks as $task) {
            $data[] = [
                'id' => $task->getId(),
                'description' => $task->getDescription(),
                'completed' => $task->isCompleted(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/tasks', name: 'add_task', methods: ['POST'])]
    public function addTask(ManagerRegistry $managerRegistry, Request $request): Response
    {
        if (!$request->query->has('description')) {
            return new Response('Missing description parameter', Response::HTTP_BAD_REQUEST);
        }

        $entity = $managerRegistry->getManager();
        $task = new Task();
        $task->setDescription($request->query->get('description'));
        $task->setCompleted(false);
        $entity->persist($task);
        $entity->flush();

        return new Response(sprintf('Task %s successfully created', $task->getId()), Response::HTTP_OK);
    }

    #[Route('/tasks/{id}', name: 'get_task', methods: ['DELETE'])]
    public function deleteTask(ManagerRegistry $managerRegistry, int $id): Response
    {
        $entity = $managerRegistry->getManager();
        $task = $managerRegistry->getRepository(Task::class)->find($id);

        if (!$task) {
            return new Response(sprintf('Task %s not found', $id), Response::HTTP_NOT_FOUND);
        }

        $entity->remove($task);
        $entity->flush();

        return new Response(sprintf('Task %s successfully deleted', $id), Response::HTTP_OK);
    }

    #[Route('/tasks/{id}', name: 'update_task', methods: ['PATCH'])]
    public function setTaskState(ManagerRegistry $managerRegistry, int $id): Response
    {
        $entity = $managerRegistry->getManager();
        $task = $managerRegistry->getRepository(Task::class)->find($id);

        if (!$task) {
            return new Response(sprintf('Task %s not found', $id), Response::HTTP_NOT_FOUND);
        }

        if($task->isCompleted()) {
            $task->setCompleted(false);
        } else {
            $task->setCompleted(true);
        }

        $entity->flush();

        return new Response(sprintf('Task %s successfully updated', $id), Response::HTTP_OK);
    }
}
